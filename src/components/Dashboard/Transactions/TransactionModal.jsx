import React, { useEffect, useState } from "react";
import {
  createTransaction,
  updateTransaction,
} from "../../../app/features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../../app/features/bookingSlice";

export default function TransactionModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();

  const [bookingId, setBookingId] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const { bookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  useEffect(() => {
    if (editData) {
      setBookingId(editData.bookingId);
    } else {
      setBookingId("");
      setPaymentProof(null);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookingId", bookingId);
    if (paymentProof) {
      formData.append("paymentProof", paymentProof);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Pilih Booking</label>
            <select
              className="select select-bordered w-full"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              required
              disabled={!!editData}
            >
              <option value="">-- Pilih Booking --</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} - {booking.user?.name} -{" "}
                  {booking.servicePrice?.service?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Bukti Pembayaran</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setPaymentProof(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
