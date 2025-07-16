'use client';

import { useState } from 'react';
import { Contact, ContactCategory } from '@/types/contact';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  mode: 'create' | 'edit';
  contact?: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Contact, 'id'>) => void;
}

export default function ContactModal({
  mode,
  contact,
  isOpen,
  onClose,
  onSubmit,
}: ContactModalProps) {
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const category = formData.get('category') as ContactCategory;

    const newErrors: { email?: string; phone?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone number must contain only numbers.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({ name, email, phone, company, category });
  };

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
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-slate-800">
                  {mode === 'edit' ? 'Edit Contact' : 'New Contact'}
                </h2>
                <p className="text-sm text-slate-500">
                  {mode === 'edit'
                    ? 'Update this contact\'s information'
                    : 'Fill out the form to add a new contact'}
                </p>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <input
                  name="name"
                  defaultValue={contact?.name}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <div>
                  <input
                    name="email"
                    type="text"
                    defaultValue={contact?.email}
                    placeholder="Email"
                    required
                    className={`w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 focus:ring-green-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={contact?.phone}
                    placeholder="Phone Number"
                    required
                    className={`w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 focus:ring-green-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <input
                  name="company"
                  defaultValue={contact?.company || ''}
                  placeholder="Company (Optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <select
                  name="category"
                  defaultValue={contact?.category || 'Customer'}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  {['Customer', 'Vendor', 'VIP', 'Partner', 'Employee'].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-500 hover:underline text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm"
                >
                  {mode === 'edit' ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
