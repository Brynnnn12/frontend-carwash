import { Formik, Form, Field, ErrorMessage } from "formik";
import ServiceSchema from "../../../utils/Schemas/serviceSchema"; // ✅ Import schema yang sudah dipisah

export default function ServiceForm({ initialValues, onSubmit, loading }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ServiceSchema} // ✅ Pakai schema dari file terpisah
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-4">
        <div className="form-control">
          <label className="label font-medium text-gray-700">
            Nama Layanan
          </label>
          <Field
            type="text"
            name="name"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Contoh: Cuci Mobil Premium"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="form-control">
          <label className="label font-medium text-gray-700">Harga</label>
          <Field
            type="number"
            name="price"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Contoh: 50000"
          />
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="form-control">
          <label className="label font-medium text-gray-700">Deskripsi</label>
          <Field
            as="textarea"
            name="description"
            rows={3}
            className="textarea textarea-bordered w-full bg-white text-gray-800"
            placeholder="Deskripsi layanan..."
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="modal-action mt-6 flex justify-between items-center">
          <div></div> {/* Placeholder biar tombol simpan ke kanan */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
