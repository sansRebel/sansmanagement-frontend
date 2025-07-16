'use client';

import { Contact } from '@/types/contact';

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onView: (contact: Contact) => void;
}

export default function ContactTable({
  contacts,
  onEdit,
  onDelete,
  onView,
}: ContactTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600 tracking-wider">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{contact.name}</td>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4">{contact.company || '-'}</td>
              <td className="px-6 py-4">{contact.category}</td>
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  className="text-gray-600 hover:text-gray-800 font-medium"
                  onClick={() => onView(contact)}
                >
                  View
                </button>
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => onEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() => onDelete(contact)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
