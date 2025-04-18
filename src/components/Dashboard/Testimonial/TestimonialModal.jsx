import { useDispatch } from "react-redux";
import {
  createTestimonial,
  updateTestimonial,
} from "../../../app/features/testimonialSlice";

export default function TestimonialModal({
  open,
  onClose,
  formData,
  setFormData,
  isEditMode,
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStarClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updateTestimonial(formData));
    } else {
      dispatch(createTestimonial(formData));
    }
  };

  return (
    open && (
      <dialog open className="modal modal-open">
        <div className="modal-box bg-white text-black max-w-md w-full">
          <h3 className="font-bold text-2xl mb-6">
            {isEditMode ? "Edit Testimoni" : "Tambah Testimoni"}
          </h3>

          <div className="form-control mb-5">
            <label className="label font-semibold mb-1">Rating</label>
            <div className="rating gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={Number(formData.rating) === star}
                  onChange={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label font-semibold mb-1">Komentar</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="textarea textarea-bordered bg-gray-100 text-black"
              placeholder="Tulis komentarmu..."
              rows={4}
            />
          </div>

          <div className="modal-action mt-6">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isEditMode ? "Update" : "Tambah"}
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
          </div>
        </div>
      </dialog>
    )
  );
}
