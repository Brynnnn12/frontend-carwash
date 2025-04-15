import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/image/carwash.jpg",
      title: "Layanan Cucian Berkualitas Tinggi",
      subtitle: "Kami memberikan pelayanan terbaik dengan hasil maksimal",
    },
    {
      id: 2,
      image: "/image/carwash1.jpg",
      title: "Pencucian Cepat & Higienis",
      subtitle: "Proses cepat dengan standar kebersihan tinggi",
    },
    {
      id: 3,
      image: "/image/carwash2.jpg",
      title: "Antar Jemput Gratis",
      subtitle: "Kami akan menjemput dan mengantarkan cucian Anda",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div id="hero" className="relative h-[90vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <Motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0  bg-opacity-50 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <Motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  {slides[currentSlide].title}
                </Motion.h1>
                <Motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-xl md:text-2xl mb-8"
                >
                  {slides[currentSlide].subtitle}
                </Motion.p>
                <Motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <button className="btn btn-primary mr-4">
                    Pesan Sekarang
                  </button>
                  <button className="btn btn-outline btn-accent">
                    Lihat Layanan
                  </button>
                </Motion.div>
              </div>
            </div>
          </div>
        </Motion.div>
      </AnimatePresence>

      {/* Navigation buttons - hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-md glass"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-md glass"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
