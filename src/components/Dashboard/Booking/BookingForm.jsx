/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function BookingForm({
  formik,
  profile,
  servicePrices,
  selectedService,
  setSelectedService,
}) {
  const uniqueServices = [
    ...new Map(
      servicePrices.map((sp) => [
        `${sp.service?.id}-${sp.service?.name}`,
        sp.service,
      ])
    ).values(),
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    if (!formik.values.servicePriceId) setSelectedService("");
  }, [formik.values.servicePriceId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* LEFT COLUMN */}
      <div className="space-y-5">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-800">
              Nama Pemesan
            </span>
          </label>
          <input
            type="text"
            value={profile?.name || ""}
            readOnly
            className="input input-bordered w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-800">
              Nomor HP
            </span>
          </label>
          <input
            type="text"
            value={profile?.phoneNumber || ""}
            readOnly
            className="input input-bordered w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* License Plate Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-800">
              Plat Nomor Kendaraan
            </span>
          </label>
          <input
            type="text"
            name="licensePlate"
            onChange={formik.handleChange}
            value={formik.values.licensePlate}
            className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Contoh: B 1234 ABC"
          />
          {formik.touched.licensePlate && formik.errors.licensePlate && (
            <label className="label">
              <span className="label-text-alt text-red-600 font-medium">
                {formik.errors.licensePlate}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-5">
        {/* Service Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-800">
              Pilih Layanan
            </span>
          </label>
          <select
            className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              formik.setFieldValue("servicePriceId", "");
            }}
          >
            <option value="" disabled className="text-gray-400">
              Pilih layanan
            </option>
            {uniqueServices.map((service) => (
              <option
                key={service.id}
                value={service.name}
                className="text-gray-800"
              >
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Car Type & Price */}
        {selectedService && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-800">
                Tipe Mobil & Harga
              </span>
            </label>
            <select
              name="servicePriceId"
              className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formik.values.servicePriceId}
              onChange={formik.handleChange}
            >
              <option value="" disabled className="text-gray-400">
                Pilih tipe mobil & harga
              </option>
              {servicePrices
                .filter((sp) => sp.service?.name === selectedService)
                .map((sp) => (
                  <option key={sp.id} value={sp.id} className="text-gray-800">
                    {sp.car_type} - {formatPrice(sp.price)}
                  </option>
                ))}
            </select>
            {formik.touched.servicePriceId && formik.errors.servicePriceId && (
              <label className="label">
                <span className="label-text-alt text-red-600 font-medium">
                  {formik.errors.servicePriceId}
                </span>
              </label>
            )}
          </div>
        )}

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-800">
                Tanggal Booking
              </span>
            </label>
            <input
              type="date"
              name="bookingDate"
              onChange={formik.handleChange}
              value={formik.values.bookingDate}
              className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formik.touched.bookingDate && formik.errors.bookingDate && (
              <label className="label">
                <span className="label-text-alt text-red-600 font-medium">
                  {formik.errors.bookingDate}
                </span>
              </label>
            )}
          </div>

          {/* Time Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-800">
                Waktu Booking
              </span>
            </label>
            <input
              type="time"
              name="bookingTime"
              onChange={formik.handleChange}
              value={formik.values.bookingTime}
              className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formik.touched.bookingTime && formik.errors.bookingTime && (
              <label className="label">
                <span className="label-text-alt text-red-600 font-medium">
                  {formik.errors.bookingTime}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
