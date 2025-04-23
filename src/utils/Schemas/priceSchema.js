import * as Yup from "yup";

export const PriceSchema = Yup.object().shape({
  serviceId: Yup.string().required("Layanan wajib dipilih"),
  car_type: Yup.string().required("Tipe mobil wajib diisi"),
  price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga harus lebih dari 0")
    .min(20000, "Harga Minimal 20000")
    .max(100000, "Harga Max 100000")
    .integer("Harga tidak boleh desimal")
    .required("Harga wajib diisi"),
});
