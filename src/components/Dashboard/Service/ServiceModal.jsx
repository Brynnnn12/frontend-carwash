import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  resetServiceState,
  updateService,
} from "../../../app/features/serviceSlice";

export default function ServiceModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.services);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({ name: "", price: "", description: "" });
    }
  }, [editData]);

  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetServiceState());
    }
  }, [success, dispatch, onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editData) {
      dispatch(updateService({ id: editData.id, serviceData: form }));
    } else {
      dispatch(createService(form));
    }
  };

  return (
    <dialog
      id="service_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-semibold text-2xl mb-6 text-center">
          {editData ? "Edit Layanan" : "Tambah Layanan"}
        </h3>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Nama Layanan
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Contoh: Cuci Mobil Premium"
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
              placeholder="Contoh: 50000"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-white text-gray-800"
              placeholder="Deskripsi layanan..."
              rows={3}
            ></textarea>
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
