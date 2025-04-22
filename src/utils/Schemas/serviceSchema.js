import * as Yup from "yup";

const ServiceSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Nama layanan wajib diisi")
    .min(3, "Nama layanan minimal 3 karakter"),

  price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga harus lebih dari 0")
    .min(20000, "Harga Minimal 20000")
    .max(100000, "Harga Max 100000")
    .integer("Harga tidak boleh desimal")
    .required("Harga wajib diisi"),

  description: Yup.string()
    .trim()
    .required("Deskripsi wajib diisi")
    .min(10, "Deskripsi minimal 10 karakter"),
});

export default ServiceSchema;
