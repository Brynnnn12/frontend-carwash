import { useDispatch, useSelector } from "react-redux";
import {
  createTestimonial,
  updateTestimonial,
} from "../../../app/features/testimonialSlice";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialModal({
  open,
  onClose,
  formData,
  isEditMode,
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.testimonials);

  const initialValues = {
    rating: formData?.rating || 0,
    comment: formData?.comment || "",
  };

  const handleSubmit = async (values) => {
    if (isEditMode) {
      await dispatch(updateTestimonial({ ...formData, ...values }));
    } else {
      await dispatch(createTestimonial(values));
    }
    onClose();
  };

  return (
    open && (
      <dialog open className="modal modal-open">
        <div className="modal-box bg-white text-black max-w-md w-full relative">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </button>

          <h3 className="font-bold text-2xl mb-6 text-center">
            {isEditMode ? "Edit Testimoni" : "Tambah Testimoni"}
          </h3>

          <TestimonialForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </dialog>
    )
  );
}
