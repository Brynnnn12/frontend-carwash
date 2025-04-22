// components/forms/TestimonialForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TestimonialSchema } from "../../../utils/Schemas/testimonialSchema";

export default function TestimonialForm({ initialValues, onSubmit, loading }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TestimonialSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          {/* Rating */}
          <div className="form-control mb-5">
            <label className="label font-semibold mb-1">Rating</label>
            <div className="rating gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={Number(values.rating) === star}
                  onChange={() => setFieldValue("rating", star)}
                />
              ))}
            </div>
            <ErrorMessage
              name="rating"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Komentar */}
          <div className="form-control mb-6">
            <label className="label font-semibold mb-1">Komentar</label>
            <Field
              as="textarea"
              name="comment"
              className="textarea textarea-bordered bg-gray-100 text-black"
              placeholder="Tulis komentarmu..."
              rows={4}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Tombol */}
          <div className="modal-action mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
