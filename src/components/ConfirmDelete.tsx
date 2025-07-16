'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName?: string;
}

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  contactName,
}: ConfirmDeleteProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-red-600">Delete Contact</h2>
              <p className="text-sm text-gray-700">
                Are you sure you want to delete <strong>{contactName || 'this contact'}</strong>?
              </p>
              <div className="flex justify-end gap-2 pt-4">
                <button onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
                <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
