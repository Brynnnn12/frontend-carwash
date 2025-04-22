import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicePrice,
  updateServicePrice,
  clearCurrentServicePrice,
  getServicePrices,
} from "../../../app/features/servicePrice";
import { fetchServices } from "../../../app/features/serviceSlice";

export default function PriceModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.servicePrices);
  const { services } = useSelector((state) => state.services);

  const [form, setForm] = useState({
    serviceId: "",
    car_type: "",
    price: "",
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchServices()); // Fetch services hanya ketika modal dibuka
    }
  }, [dispatch, isOpen]); // Tambahkan isOpen sebagai dependency

  useEffect(() => {
    if (editData) {
      setForm({
        serviceId: editData.serviceId || "",
        car_type: editData.car_type || "",
        price: editData.price || "",
      });
    } else {
      setForm({ serviceId: "", car_type: "", price: "" });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editData) {
      await dispatch(
        updateServicePrice({ id: editData.id, servicePriceData: form })
      );
    } else {
      await dispatch(createServicePrice(form));
    }
    dispatch(getServicePrices({ page: 1, limit: 10 }));
    onClose();
    dispatch(clearCurrentServicePrice());
  };

  return (
    <dialog id="price_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-semibold text-2xl mb-6 text-center">
          {editData ? "Edit Harga" : "Tambah Harga"}
        </h3>

        <div className="space-y-4">
          {/* Service ID as SELECT */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Layanan</label>
            <select
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              className="select select-bordered w-full bg-white text-gray-800"
            >
              <option value="">Pilih Layanan</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Tipe Mobil
            </label>
            <input
              type="text"
              name="car_type"
              value={form.car_type}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Contoh: SUV, Sedan, MPV"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">Harga</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Contoh: 75000"
            />
          </div>
        </div>

        <div className="modal-action mt-6 flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button onClick={onClose} className="btn btn-outline">
            Batal
          </button>
        </div>
      </div>
    </dialog>
  );
}
