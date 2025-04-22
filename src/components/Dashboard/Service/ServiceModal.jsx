// components/modals/ServiceModal.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  resetServiceState,
  updateService,
} from "../../../app/features/serviceSlice";
import ServiceForm from "./ServiceForm";

export default function ServiceModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.services);

  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetServiceState());
    }
  }, [success, dispatch, onClose]);

  const handleSubmit = (values) => {
    if (editData) {
      dispatch(updateService({ id: editData.id, serviceData: values }));
    } else {
      dispatch(createService(values));
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

        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <ServiceForm
          initialValues={{
            name: editData?.name || "",
            price: editData?.price || "",
            description: editData?.description || "",
          }}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
