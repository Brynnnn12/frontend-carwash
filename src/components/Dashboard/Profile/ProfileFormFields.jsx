import { Field, ErrorMessage } from "formik";

const ProfileFormFields = () => (
  <div className="grid grid-cols-1 gap-4 text-black">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nama Lengkap
      </label>
      <Field
        name="name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Masukkan alamat"
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
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Contoh: 081234567890"
      />
      <ErrorMessage
        name="phoneNumber"
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  </div>
);

export default ProfileFormFields;
