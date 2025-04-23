import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../app/features/testimonialSlice";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion/Animate";

const TestimonialSection = () => {
  const dispatch = useDispatch();
  const { testimonials, pagination, loading } = useSelector(
    (state) => state.testimonials
  );

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    dispatch(fetchTestimonials({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-12 px-4 mt-12 bg-gray-100 "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="text-center mb-12 text-gray-700"
        >
          <h2 className="text-4xl font-bold mb-4">Apa Kata Mereka</h2>
          <p className="text-lg opacity-70">
            Testimonial jujur dari pelanggan kami
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeIn("up", "tween", index * 0.1, 0.5)}
              whileHover={{ y: -5 }}
              className="card bg-white text-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span className="text-xl">
                        {testimonial.user?.username?.charAt(0) || "U"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="card-title">
                      {testimonial.user?.username || "Anonymous"}
                    </h3>
                    <div className="flex gap-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="mt-4 italic">"{testimonial.comment}"</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm opacity-50">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => toggleLike(testimonial.id)}
                    className="btn btn-ghost btn-sm"
                  >
                    {liked[testimonial.id] ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          variants={fadeIn("up", "tween", 0.8, 1)}
          className="join flex justify-center mt-12"
        >
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="join-item btn btn-outline"
          >
            «
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages}
            className="join-item btn btn-outline"
          >
            »
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
