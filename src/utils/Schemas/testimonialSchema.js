// components/schemas/testimonialSchema.js
import * as Yup from "yup";

export const TestimonialSchema = Yup.object().shape({
  rating: Yup.number()
    .typeError("Rating harus berupa angka")
    .required("Rating wajib diisi")
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5")
    .integer("Rating harus bilangan bulat"),

  comment: Yup.string()
    .required("Komentar wajib diisi")
    .min(10, "Komentar minimal 10 karakter")
    .max(1000, "Komentar maksimal 1000 karakter"),
});
