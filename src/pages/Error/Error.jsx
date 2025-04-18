import React from "react";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-xl"
      >
        <div className="card-body items-center text-center">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, -5, 5, 0],
              scale: [1, 1.1, 1.1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
              repeatDelay: 1,
            }}
          >
            <div className="text-8xl mb-4">⚠️</div>
          </motion.div>

          <h2 className="card-title text-3xl mb-2">Oops!</h2>
          <p className="text-lg mb-6">
            Terjadi kesalahan. Halaman yang Anda cari tidak dapat dimuat.
          </p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              Kembali
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
