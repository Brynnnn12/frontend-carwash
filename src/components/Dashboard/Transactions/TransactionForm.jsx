// components/transactions/TransactionForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const getValidationSchema = (isEdit) =>
  Yup.object().shape({
    bookingId: Yup.string().required("Booking harus dipilih"),
    paymentProof: isEdit
      ? Yup.mixed()
          .required("Bukti pembayaran wajib diisi saat edit")
          .test(
            "fileType",
            "Format tidak didukung (hanya gambar)",
            (value) =>
              !value ||
              (value &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
          )
      : Yup.mixed().nullable(),
  });

export default function TransactionForm({
  initialValues,
  onSubmit,
  bookings,
  isEdit,
  onClose,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(isEdit)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <label className="label">Pilih Booking</label>
            <Field
              as="select"
              name="bookingId"
              className="select select-bordered w-full"
              disabled={isEdit}
            >
              <option value="">-- Pilih Booking --</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} - {booking.user?.name} -{" "}
                  {booking.servicePrice?.service?.name}
                </option>
              ))}
            </Field>
            <div className="text-red-500 text-sm">
              <ErrorMessage name="bookingId" />
            </div>
          </div>

          <div>
            <label className="label">Bukti Pembayaran</label>
            <input
              name="paymentProof"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(event) => {
                setFieldValue("paymentProof", event.currentTarget.files[0]);
              }}
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="paymentProof" />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
