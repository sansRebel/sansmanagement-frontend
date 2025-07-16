'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface ToasterProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toaster({ message, type, onClose }: ToasterProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white
              ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
            `}
          >
            {type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
            <span className="text-sm">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
