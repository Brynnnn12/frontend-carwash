import * as Yup from "yup";

export const PriceSchema = Yup.object().shape({
  serviceId: Yup.string().required("Layanan wajib dipilih"),
  car_type: Yup.string().required("Tipe mobil wajib diisi"),
  price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga harus lebih dari 0")
    .required("Harga wajib diisi"),
});
