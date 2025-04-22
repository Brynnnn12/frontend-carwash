import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  createProfile,
  updateProfile,
} from "../../../app/features/profileSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Harus berupa angka")
    .min(10, "Minimal 10 digit")
    .max(15, "Maksimal 15 digit")
    .required("Nomor telepon wajib diisi"),
  avatar: Yup.mixed()
    .test("fileType", "Hanya file JPG/JPEG/PNG yang diizinkan", (value) => {
      return !value || SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "Ukuran maksimal 2MB", (value) => {
      return !value || value.size <= 2000000;
    }),
});

const ProfileForm = () => {
  const dispatch = useDispatch();
  const {
    data: profile,
    status,
    error,
  } = useSelector((state) => state.profile);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.avatar) {
      setPreview(profile.avatar);
    }
  }, [profile]);

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("phoneNumber", values.phoneNumber);
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    try {
      if (profile) {
        await dispatch(updateProfile(formData)).unwrap();
        toast.success("Profil berhasil diperbarui!");
      } else {
        await dispatch(createProfile(formData)).unwrap();
        toast.success("Profil berhasil dibuat!");
      }
      resetForm();
    } catch (err) {
      toast.error(err?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 ">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {profile ? "Edit Profil" : "Buat Profil"}
      </h2>

      {status === "loading" ? (
        <div className="text-center text-gray-500">Memuat profil...</div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            name: profile?.name || "",
            address: profile?.address || "",
            phoneNumber: profile?.phoneNumber || "",
            avatar: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative group">
                  <img
                    src={preview || "/default-avatar.png"}
                    alt="Avatar Preview"
                    className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-100"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">
                      Ubah Foto
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-black">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <Field
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan nama lengkap"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat
                  </label>
                  <Field
                    name="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan alamat lengkap"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <Field
                    name="phoneNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Contoh: 081234567890"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {preview ? "Ganti Foto Profil" : "Unggah Foto Profil"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    name="avatar"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isSubmitting || status === "loading"}
              >
                {isSubmitting || status === "loading"
                  ? "Menyimpan..."
                  : profile
                  ? "Simpan Perubahan"
                  : "Buat Profil"}
              </button>

              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {error}
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProfileForm;
