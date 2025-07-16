'use client';

import { Contact, ContactCategory } from '@/types/contact';

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      category: formData.get('category') as ContactCategory,
    };
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">
            {mode === 'edit' ? 'Edit Contact' : 'New Contact'}
          </h2>

          <input
            name="name"
            defaultValue={contact?.name}
            placeholder="Name"
            required
            className="border rounded p-2"
          />
          <input
            name="email"
            defaultValue={contact?.email}
            placeholder="Email"
            required
            className="border rounded p-2"
          />
          <input
            name="phone"
            defaultValue={contact?.phone}
            placeholder="Phone"
            required
            className="border rounded p-2"
          />
          <input
            name="company"
            defaultValue={contact?.company || ''}
            placeholder="Company"
            className="border rounded p-2"
          />

          <select
            name="category"
            defaultValue={contact?.category || 'Customer'}
            required
            className="border rounded p-2"
          >
            {['Customer', 'Vendor', 'VIP', 'Partner', 'Employee'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
