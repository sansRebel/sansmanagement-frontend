'use client';

import { Contact } from '@/types/contact';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactViewModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactViewModal({ contact, isOpen, onClose }: ContactViewModalProps) {
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
            transition={{ duration: 0.25 }}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Contact Details</h2>
            <div className="space-y-2 text-sm text-gray-800">
              <div><strong>Name:</strong> {contact.name}</div>
              <div><strong>Email:</strong> {contact.email}</div>
              <div><strong>Phone:</strong> {contact.phone}</div>
              <div><strong>Company:</strong> {contact.company || '-'}</div>
              <div><strong>Category:</strong> {contact.category}</div>
            </div>
            <button
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
