import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicePrice,
  updateServicePrice,
  clearCurrentServicePrice,
  getServicePrices,
} from "../../../app/features/servicePrice";
import { fetchServices } from "../../../app/features/serviceSlice";
import ServicePriceForm from "./PriceForm";

export default function PriceModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.servicePrices);
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    if (isOpen) dispatch(fetchServices());
  }, [dispatch, isOpen]);

  const initialValues = {
    serviceId: editData?.serviceId || "",
    car_type: editData?.car_type || "",
    price: editData?.price || "",
  };

  const handleSubmit = async (values) => {
    if (editData) {
      await dispatch(
        updateServicePrice({ id: editData.id, servicePriceData: values })
      );
    } else {
      await dispatch(createServicePrice(values));
    }

    dispatch(getServicePrices({ page: 1, limit: 10 }));
    onClose();
    dispatch(clearCurrentServicePrice());
  };

  return (
    <dialog id="price_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <h3 className="font-semibold text-2xl mb-6 text-center">
          {editData ? "Edit Harga" : "Tambah Harga"}
        </h3>

        <ServicePriceForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
          services={services}
        />
      </div>
    </dialog>
  );
}
