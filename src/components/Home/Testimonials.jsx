import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchTestimonials,
} from "../../app/features/testimonialSlice";

import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const TestimonialPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const intervalRef = useRef(null);

  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchTestimonials({ page: 1, limit: 10 }));

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(3); // desktop
      } else if (width >= 768) {
        setItemsPerSlide(2); // tablet
      } else {
        setItemsPerSlide(1); // mobile
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group testimonials based on itemsPerSlide
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials?.length; i += itemsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + itemsPerSlide));
  }

  const totalSlides = groupedTestimonials.length;

  useEffect(() => {
    // Reset slide if current slide is out of bounds after resizing
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }

    // Set up auto-rotation interval only if there are testimonials
    if (totalSlides > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 8000);
    }

    return () => clearInterval(intervalRef.current);
  }, [totalSlides, currentSlide]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  // Render star rating component
  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-amber-400 text-sm ${
            i < rating ? "opacity-100" : "opacity-50"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  // Render testimonial card component
  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      key={testimonial._id}
      className="bg-white rounded-3xl shadow-lg p-6 transition hover:shadow-xl"
    >
      <div className="flex items-center gap-4 mb-4">
        {testimonial.user?.profile?.avatar ? (
          <img
            src={testimonial.user.profile.avatar}
            alt={testimonial.user?.username}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-14 h-14 text-gray-400" />
        )}

        <div>
          <h3 className="text-md font-semibold text-neutral-900">
            {testimonial.user?.username}
          </h3>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed">
        "{testimonial.comment}"
      </p>
    </motion.div>
  );

  // Navigation dots for slides
  const SlideIndicators = () => (
    <div className="flex justify-center gap-4 mt-8">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={`indicator-${i}`}
          onClick={() => {
            setCurrentSlide(i);
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 8000);
          }}
          className={`w-4 h-4 rounded-full transition-all ${
            i === currentSlide ? "bg-accent w-6" : "bg-accent-content"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Testimoni Pelanggan
          </h1>
          <p className="text-base md:text-lg text-secondary">
            Memuat testimoni...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-pulse bg-white rounded-3xl shadow-lg p-6 w-full max-w-md h-64" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Testimoni Pelanggan
          </h1>
          <p className="text-base md:text-lg text-red-500">
            {error.message || "Gagal memuat testimoni"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="testimoni"
      className="bg-gradient-to-br from-neutral-100 to-neutral-200 py-16 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
          Testimoni Pelanggan
        </h1>
        <p className="text-base md:text-lg text-secondary">
          Lihat apa kata mereka tentang layanan kami
        </p>
      </motion.div>

      {testimonials?.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-${currentSlide}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2 md:px-4"
            >
              {groupedTestimonials[currentSlide]?.map((testimonial, index) => (
                <TestimonialCard
                  key={`card-${testimonial._id || index}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {totalSlides > 1 && <SlideIndicators />}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500">Belum ada testimoni yang tersedia</p>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          to="/testimonials"
          className="inline-block bg-primary hover:bg-primary-focus text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Lihat Semua Testimoni
        </Link>
      </div>
    </div>
  );
};

export default TestimonialPage;
