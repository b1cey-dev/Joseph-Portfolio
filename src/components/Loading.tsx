'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900 flex items-center justify-center z-[9999]"
    >
      <div className="text-center">
        {/* Text Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold">
            <span className="text-white">Joseph</span>
            <span className="text-blue-500 ml-2">Robinson</span>
          </h2>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-6 flex justify-center gap-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
} 