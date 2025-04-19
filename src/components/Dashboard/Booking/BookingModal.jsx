import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function BookingModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditMode,
  error,
  loading,
  servicePrices = [],
  profile,
}) {
  useEffect(() => {
    const modal = document.getElementById("booking_modal");
    if (open) modal?.showModal();
    else modal?.close();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <dialog id="booking_modal" className="modal">
      <div className="modal-box max-w-3xl bg-white text-gray-800 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-2xl text-primary">
            {isEditMode ? "Edit Booking" : "Buat Booking Baru"}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:bg-primary/10 text-gray-500 hover:text-primary"
          >
            <FiX size={20} />
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-6 bg-error/10 text-error border border-error/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Nama Pemesan
                  </span>
                </label>
                <input
                  type="text"
                  value={profile?.name || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-50 text-gray-600"
                />
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Nomor HP
                  </span>
                </label>
                <input
                  type="text"
                  value={profile?.phoneNumber || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-50 text-gray-600"
                />
              </div>

              {/* License Plate */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Plat Nomor Kendaraan
                  </span>
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate || ""}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: B 1234 ABC"
                  className="input bg-gray-100 text-gray-700 input-bordered w-full"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Service Select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Pilih Layanan
                  </span>
                </label>
                <select
                  name="servicePriceId"
                  value={formData.servicePriceId || ""}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full bg-gray-50"
                >
                  <option value="" disabled>
                    Pilih layanan servis
                  </option>
                  {servicePrices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.car_type} - {formatPrice(service.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Booking Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Tanggal Booking
                  </span>
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate || ""}
                  onChange={handleChange}
                  required
                  className="input bg-gray-100 text-gray-700 input-bordered w-full"
                />
              </div>

              {/* Booking Time */}
              <div className="form-control">
                <label className="label ">
                  <span className="label-text font-medium text-gray-700">
                    Waktu Booking
                  </span>
                </label>
                <input
                  type="time"
                  name="bookingTime"
                  value={formData.bookingTime || ""}
                  onChange={handleChange}
                  required
                  className="input bg-gray-100 text-gray-700 input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div className="modal-action mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-gray-600 hover:bg-gray-100"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : isEditMode ? (
                "Update Booking"
              ) : (
                "Buat Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
