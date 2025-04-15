import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const TestimonialPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      rating: 5,
      content:
        "Cucian mobilnya sangat bersih dan mengkilap! Pelayanannya cepat dan ramah.",
      image: "/api/placeholder/56/56",
    },
    {
      id: 2,
      name: "Ani Wijaya",
      rating: 4,
      content:
        "Saya sangat puas dengan paket cuci interior. Jok mobil sekarang bersih dan wangi.",
      image: "/api/placeholder/56/56",
    },
    {
      id: 3,
      name: "Rudi Hartono",
      rating: 5,
      content:
        "Layanan premium mereka worth it banget! Detailingnya sangat teliti.",
      image: "/api/placeholder/56/56",
    },
    {
      id: 4,
      name: "Siti Nurhaliza",
      rating: 5,
      content:
        "Paket reguler pun hasilnya memuaskan. Mobil saya selalu bersih maksimal.",
      image: "/api/placeholder/56/56",
    },
    {
      id: 5,
      name: "Agus Setiawan",
      rating: 4,
      content:
        "Sebagai driver online, saya rutin cuci disini. Cepat, bersih, dan wangi.",
      image: "/api/placeholder/56/56",
    },
    {
      id: 6,
      name: "Dewi Lestari",
      rating: 5,
      content:
        "Pelayanan sangat profesional! Hasil detailingnya melebihi ekspektasi saya.",
      image: "/api/placeholder/56/56",
    },
  ];

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
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + itemsPerSlide));
  }

  const totalSlides = groupedTestimonials.length;

  useEffect(() => {
    // Reset slide if current slide is out of bounds after resizing
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }

    // Set up auto-rotation interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);

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
      key={testimonial.id}
      className="bg-white rounded-3xl shadow-lg p-6 transition hover:shadow-xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-md font-semibold text-neutral-900">
            {testimonial.name}
          </h3>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed">
        "{testimonial.content}"
      </p>
    </motion.div>
  );

  // Navigation dots for slides
  const SlideIndicators = () => (
    <div className="flex justify-center gap-4 mt-8">
      {[...Array(totalSlides)].map((_, i) => (
        <button
          key={i}
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

  return (
    <div
      id="testimonial"
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2 md:px-4"
        >
          {groupedTestimonials[currentSlide]?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </AnimatePresence>

      <SlideIndicators />

      <div className="mt-10 flex justify-center">
        <a
          href="/testimoni"
          className="inline-block bg-primary hover:bg-primary-focus text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Lihat Semua Testimoni
        </a>
      </div>
    </div>
  );
};

export default TestimonialPage;
