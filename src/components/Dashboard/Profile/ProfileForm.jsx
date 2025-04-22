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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi"),
    address: Yup.string().required("Alamat wajib diisi"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Harus berupa angka")
      .min(10, "Minimal 10 digit")
      .max(15, "Maksimal 15 digit")
      .required("Nomor telepon wajib diisi"),
  });

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
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
    } catch (err) {
      toast.error(err?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {profile ? "Edit Profil" : "Buat Profil"}
      </h2>

      {preview && (
        <div className="mb-4 flex flex-col items-center">
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-32 h-32 object-cover rounded-full shadow"
          />
        </div>
      )}

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
            <div>
              <Field
                name="name"
                className="input input-bordered w-full"
                placeholder="Nama"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="address"
                className="input input-bordered w-full"
                placeholder="Alamat"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="phoneNumber"
                className="input input-bordered w-full"
                placeholder="Nomor HP"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleFileChange(e, setFieldValue)}
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || status === "loading"}
            >
              {isSubmitting || status === "loading"
                ? "Menyimpan..."
                : profile
                ? "Perbarui Profil"
                : "Buat Profil"}
            </button>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
