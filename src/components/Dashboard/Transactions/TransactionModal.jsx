// components/transactions/TransactionModal.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../../../app/features/transactionSlice";
import { getUserBookings } from "../../../app/features/bookingSlice";
import TransactionForm from "./TransactionForm";

export default function TransactionModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);

  const [initialValues, setInitialValues] = useState({
    bookingId: "",
    paymentProof: null,
  });

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  useEffect(() => {
    if (editData) {
      setInitialValues({
        bookingId: editData.bookingId,
        paymentProof: null,
      });
    } else {
      setInitialValues({
        bookingId: "",
        paymentProof: null,
      });
    }
  }, [editData]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("bookingId", values.bookingId);
    if (values.paymentProof) {
      formData.append("paymentProof", values.paymentProof);
    }

    if (editData) {
      dispatch(updateTransaction({ id: editData.id, formData }));
    } else {
      dispatch(createTransaction(formData));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">
          {editData ? "Edit Transaksi" : "Tambah Transaksi"}
        </h3>
        <TransactionForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          bookings={bookings}
          isEdit={!!editData}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
