'use client';

import { Contact } from '@/types/contact';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';

interface ContactViewModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactViewModal({
  contact,
  isOpen,
  onClose,
}: ContactViewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && contact && (
        <motion.div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-2xl shadow-md mb-3">
                <FiUser />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {contact.name}
              </h2>
              <p className="text-sm text-slate-500">
                {contact.company || 'No Company'}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm text-slate-700 border-t border-b border-slate-200 py-4 px-1">
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{contact.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{contact.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Category:</span>
                <span>{contact.category}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition w-full"
                >
                  <FiMail size={16} /> Email
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition w-full"
                >
                  <FiPhone size={16} /> Call
                </a>
              )}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-5 w-full text-sm text-slate-500 hover:text-slate-700 transition underline"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
