// components/forms/ServicePriceForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PriceSchema } from "../../../utils/Schemas/priceSchema";

export default function ServicePriceForm({
  initialValues,
  onSubmit,
  loading,
  services,
}) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
      validationSchema={PriceSchema}
    >
      <Form className="space-y-4">
        {/* Layanan */}
        <div className="form-control">
          <label className="label font-medium text-gray-700">Layanan</label>
          <Field
            as="select"
            name="serviceId"
            className="select select-bordered w-full bg-white text-gray-800"
          >
            <option value="">Pilih Layanan</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="serviceId"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        {/* Tipe Mobil */}
        <div className="form-control">
          <label className="label font-medium text-gray-700">Tipe Mobil</label>
          <Field
            type="text"
            name="car_type"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Contoh: SUV, Sedan, MPV"
          />
          <ErrorMessage
            name="car_type"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        {/* Harga */}
        <div className="form-control">
          <label className="label font-medium text-gray-700">Harga</label>
          <Field
            type="number"
            name="price"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Contoh: 75000"
          />
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        {/* Tombol */}
        <div className="modal-action mt-6 flex justify-end gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
