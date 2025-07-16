'use client';

import { Contact } from '@/types/contact';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

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
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white/60 backdrop-blur-md border border-slate-100">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-100 text-xs uppercase text-slate-600 tracking-wider">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="transition duration-200 ease-in-out group hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-md hover:bg-blue-50/50"
            >
              <td className="px-6 py-4 rounded-l-xl group-hover:backdrop-blur-sm">
                {contact.name}
              </td>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4">{contact.company || '-'}</td>
              <td className="px-6 py-4">{contact.category}</td>
              <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap rounded-r-xl">
                <button
                  className="text-slate-600 hover:text-slate-800 inline-flex items-center gap-1"
                  onClick={() => onView(contact)}
                >
                  <FiEye size={16} /> View
                </button>
                <button
                  className="text-green-600 hover:text-green-800 inline-flex items-center gap-1"
                  onClick={() => onEdit(contact)}
                >
                  <FiEdit size={16} /> Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                  onClick={() => onDelete(contact)}
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
