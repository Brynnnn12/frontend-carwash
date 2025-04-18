import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchTestimonialById,
  fetchTestimonials,
  resetSuccess,
} from "../../app/features/testimonialSlice";
import TestimonialTable from "../../components/Dashboard/Testimonial/TestimonialTable";
import TestimonialModal from "../../components/Dashboard/Testimonial/TestimonialModal";

export default function Testimonials() {
  const dispatch = useDispatch();
  const {
    testimonials,
    pagination,
    currentTestimonial,
    loading,
    error,
    success,
  } = useSelector((state) => state.testimonials);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ rating: "", comment: "" });

  useEffect(() => {
    dispatch(fetchTestimonials({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (success) {
      setIsModalOpen(false);
      setFormData({ rating: "", comment: "" });
      setIsEditMode(false);

      dispatch(fetchTestimonials({ page }));

      dispatch(resetSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (currentTestimonial && isEditMode) {
      setFormData({
        rating: currentTestimonial.rating,
        comment: currentTestimonial.comment,
      });
    }
  }, [currentTestimonial, isEditMode]);

  const handleOpenCreate = () => {
    setFormData({ rating: "", comment: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (testimonial) => {
    setIsEditMode(true);
    dispatch(fetchTestimonialById(testimonial.id));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearError());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Testimoni</h2>
        <button className="btn btn-primary" onClick={handleOpenCreate}>
          Tambah Testimoni
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <TestimonialTable
        testimonials={testimonials}
        onEdit={handleOpenEdit}
        loading={loading}
      />

      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            «
          </button>
          {Array.from({ length: pagination.totalPages || 1 }, (_, i) => (
            <button
              key={i + 1}
              className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages}
          >
            »
          </button>
        </div>
      </div>

      <TestimonialModal
        open={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        isEditMode={isEditMode}
      />
    </div>
  );
}
