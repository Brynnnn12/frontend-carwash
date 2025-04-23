// BookingTable.js
import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiThumbsUp,
} from "react-icons/fi";

export default function BookingTable({
  bookings = [],
  onEdit,
  onDelete,
  onView,
  loading = false,
}) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    document.getElementById("delete_modal").showModal();
  };

  const renderDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "-";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <table className="table w-full min-w-[600px]">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="sticky left-0 z-10 bg-primary">No</th>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <span className="loading loading-spinner loading-lg"></span>
                </td>
              </tr>
            ) : !bookings || bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Tidak ada data booking
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking.id || index}>
                  <td className="sticky left-0 z-10 bg-white">{index + 1}</td>
                  <td>{booking.user?.username || "-"}</td>
                  <td>{renderDate(booking.bookingDate)}</td>
                  <td>{booking.bookingTime || "-"}</td>
                  <td title={booking.status}>
                    {booking.status === "confirmed" ? (
                      <FiCheckCircle className="text-green-600 text-xl" />
                    ) : booking.status === "pending" ? (
                      <FiClock className="text-yellow-500 text-xl" />
                    ) : booking.status === "completed" ? (
                      <FiThumbsUp className="text-blue-600 text-xl" />
                    ) : (
                      <FiXCircle className="text-red-600 text-xl" />
                    )}
                  </td>

                  <td className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => onView?.(booking)}
                      className="btn btn-sm btn-info text-white"
                    >
                      <FiEye />
                    </button>
                    {!["confirmed", "completed", "canceled"].includes(
                      booking.status
                    ) && (
                      <button
                        onClick={() => onEdit?.(booking)}
                        className="btn btn-sm btn-warning text-white"
                      >
                        <FiEdit />
                      </button>
                    )}

                    {/* Tampilkan tombol Delete hanya jika status-nya bukan confirmed */}
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => handleDeleteClick(booking)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
          <p className="py-4">
            Apakah Anda yakin ingin menghapus booking untuk{" "}
            <strong>{selectedBooking?.user?.name || "pengguna ini"}</strong>{" "}
            pada tanggal{" "}
            <strong>
              {selectedBooking ? renderDate(selectedBooking.date) : "-"}
            </strong>
            ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Batal</button>
              <button
                className="btn btn-error ml-2"
                onClick={() => {
                  onDelete?.(selectedBooking);
                  document.getElementById("delete_modal").close();
                }}
              >
                Hapus
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
