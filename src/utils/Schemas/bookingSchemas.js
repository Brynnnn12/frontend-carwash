// validation/bookingSchema.js
import * as Yup from "yup";

export const bookingSchema = Yup.object().shape({
  licensePlate: Yup.string()
    .required("Plat nomor wajib diisi")
    .matches(/^[A-Za-z0-9\s]+$/, "Format plat nomor tidak valid"),
  servicePriceId: Yup.string().required("Tipe mobil & harga harus dipilih"),
  bookingDate: Yup.string().required("Tanggal booking wajib diisi"),
  bookingTime: Yup.string().required("Waktu booking wajib diisi"),
});
