import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBookings,
  deleteBooking,
} from "../../app/features/bookingSlice";

const Booking = () => {
  const dispatch = useDispatch();
  const {
    bookings = [],
    status,
    error,
  } = useSelector((state) => state.booking || {});

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  const handleDelete = (bookingId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      dispatch(deleteBooking(bookingId));
    }
  };

  if (status === "loading")
    return <div className="text-center py-10">🔄 Memuat data booking...</div>;
  if (error)
    return (
      <div className="alert alert-error shadow-lg my-5">
        <div>
          <span>❌ {error}</span>
        </div>
      </div>
    );

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">📋 Daftar Booking Saya</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">Anda belum memiliki booking.</p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Plat Nomor</th>
                    <th>Layanan</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.licensePlate}</td>
                      <td>{booking.servicePrice?.service?.name || "-"}</td>
                      <td>
                        <div
                          className={`badge ${getStatusBadgeClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="btn btn-error btn-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "pending":
      return "badge-warning text-dark";
    case "completed":
      return "badge-success";
    case "cancelled":
      return "badge-error";
    default:
      return "badge-neutral";
  }
};

export default Booking;
