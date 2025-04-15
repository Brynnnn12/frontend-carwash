import { motion } from "framer-motion";
import { FaCar, FaCarSide, FaCarAlt, FaShower, FaStar } from "react-icons/fa";

const CarWashServices = () => {
  const services = [
    {
      id: 1,
      title: "Cuci Luar",
      description: "Pembersihan eksterior mobil termasuk body, kaca, dan ban",
      price: "Rp 50.000",
      icon: <FaCarSide className="text-4xl" />,
      features: [
        "Pencucian body mobil",
        "Pembersihan kaca depan/belakang",
        "Pembersihan ban & velg",
        "Pengeringan standar",
      ],
      color: "primary",
    },
    {
      id: 2,
      title: "Cuci Biasa",
      description: "Pembersihan eksterior dan interior dasar mobil",
      price: "Rp 80.000",
      icon: <FaCarAlt className="text-4xl" />,
      features: [
        "Semua manfaat cuci luar",
        "Vacuum interior",
        "Pembersihan dashboard",
        "Pembersihan jok dasar",
      ],
      color: "primary",
    },
    {
      id: 3,
      title: "Cuci Komplit",
      description: "Perawatan lengkap eksterior & interior mobil premium",
      price: "Rp 120.000",
      icon: <FaCar className="text-4xl" />,
      features: [
        "Semua manfaat cuci biasa",
        "Pembersihan interior menyeluruh",
        "Pembersihan celah-celah",
        "Aroma terapi mobil",
        "Perawatan ban",
      ],
      color: "primary",
    },
  ];

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
    <div
      id="services"
      className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 bg-[#f7fafc]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">
          Layanan Cucian Mobil
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Kami menyediakan berbagai paket pencucian mobil profesional dengan
          hasil maksimal dan harga terjangkau
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="card bg-white shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body items-center text-center  bg-opacity-10 rounded-t-lg">
              <div className={`text-${service.color} mb-4`}>{service.icon}</div>
              <h2 className="card-title text-gray-700 text-2xl">
                {service.title}
              </h2>
              <p className="text-gray-700">{service.description}</p>
              <div className="badge badge-lg badge-info mt-2">
                {service.price}
              </div>
            </div>
            <div className="card-body pt-0">
              <ul className="space-y-2 text-left">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaStar className="text-xs mt-1 mr-2 text-primary" />
                    <span className="text-accent">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-6">
                <button className={`btn btn-${service.color} btn-wide`}>
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarWashServices;
