import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function BookingDetail({ booking, onClose }) {
  useEffect(() => {
    if (booking) {
      document.getElementById("detail_modal")?.showModal();
    } else {
      document.getElementById("detail_modal")?.close();
    }
  }, [booking]);

  if (!booking) return null;

  return (
    <dialog id="detail_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Detail Booking</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Nama</h4>
              <p>{booking.user.profile?.name || "-"}</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Email</h4>
              <p>{booking.user?.email || "-"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Tanggal</h4>
              <p>{new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Waktu</h4>
              <p>{booking.bookingTime}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Status</h4>
              <span
                className={`badge ${
                  booking.status === "confirmed"
                    ? "badge-success"
                    : booking.status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {booking.status}
              </span>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-semibold text-gray-500">Dibuat Pada</h4>
              <p>{new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-500">Alamat</h4>
            <p className="whitespace-pre-line">
              {booking.user.profile?.address || "-"}
            </p>
          </div>
        </div>

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
}
