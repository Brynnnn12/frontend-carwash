import { motion as Motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaTruck, FaStar } from "react-icons/fa";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Gambar */}
          <Motion.div variants={itemVariants} className="lg:w-1/2 w-full">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src="image/carwash5.jpg"
                alt="Carwash"
                className="w-full h-80 object-cover"
              />
            </div>
          </Motion.div>

          {/* Konten */}
          <Motion.div variants={itemVariants} className="lg:w-1/2 w-full">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              <span className="text-primary">Tentang</span> Carwash Kami
            </h2>
            <p className="mb-6 text-gray-600 text-lg leading-relaxed">
              Carwash kami menyediakan layanan cuci mobil profesional dengan
              standar kualitas tinggi, memastikan mobil Anda bersih, kinclong,
              dan terlindungi. Dengan pengalaman lebih dari 5 tahun, kami
              memahami kebutuhan kendaraan Anda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Motion.div
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <FaShieldAlt className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Aman & Terpercaya
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Cuci mobil dengan alat dan produk yang aman untuk cat mobil.
                  </p>
                </div>
              </Motion.div>

              <Motion.div
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <FaClock className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Cepat & Efisien
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Proses cepat, tidak membuat Anda menunggu lama.
                  </p>
                </div>
              </Motion.div>

              <Motion.div
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <FaTruck className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Layanan Jemput
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Kami bisa menjemput mobil Anda untuk dicuci.
                  </p>
                </div>
              </Motion.div>

              <Motion.div
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <FaStar className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Hasil Kinclong
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Kualitas terjaga dengan hasil maksimal.
                  </p>
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
