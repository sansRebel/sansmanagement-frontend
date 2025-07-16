'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

import ContactTable from '@/components/ContactTable';
import ContactModal from '@/components/ContactModal';
import ConfirmDelete from '@/components/ConfirmDelete';
import ContactViewModal from '@/components/ContactViewModal';
import Toaster from '@/components/Toaster';
import { Contact } from '@/types/contact';
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from '@/lib/services/contactService';

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getAllContacts();
        setContacts(res);
      } catch (err: unknown) {
        setError('Failed to load contacts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const openEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const handleSave = async (data: Omit<Contact, 'id'>) => {
    try {
      if (editingContact) {
        const updated = await updateContact(editingContact.id, data);
        setContacts((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        setToast({ message: 'Contact updated successfully.', type: 'success' });
      } else {
        const created = await createContact(data);
        setContacts((prev) => [...prev, created]);
        setToast({ message: 'Contact created successfully.', type: 'success' });
      }
    } catch (err) {
      console.error('Error saving contact:', err);
      setToast({ message: 'Failed to save contact.', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setToast({ message: 'Contact deleted.', type: 'success' });
    } catch (err) {
      console.error('Error deleting contact:', err);
      setToast({ message: 'Failed to delete contact.', type: 'error' });
    } finally {
      setContactToDelete(null);
      setConfirmOpen(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.company || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory
      ? contact.category === filterCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 md:px-16 text-slate-800">
      <div className="max-w-6xl mx-auto relative">

        {/* Enhanced Heading */}
        <motion.div
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Glowing radial background behind heading */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-green-800 tracking-tight drop-shadow-md leading-tight font-[var(--font-merriweather)]">            
            SansManagement
          </h1>
          <motion.p
            className="mt-3 text-base sm:text-lg text-slate-600 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            A sleek and powerful contact management system
          </motion.p>
        </motion.div>

        {/* Search + Filter + Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-md w-full shadow-sm focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-1/4">
            <FiFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-md w-full shadow-sm focus:ring-2 focus:ring-green-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
              <option value="VIP">VIP</option>
              <option value="Partner">Partner</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-900 transition shadow-md w-full sm:w-auto"
            onClick={openCreate}
          >
            <FiPlus size={16} /> Add Contact
          </button>
        </div>

        {/* Table or Messages */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <motion.div
            key={`${searchQuery}-${filterCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ContactTable
              contacts={filteredContacts}
              onEdit={openEdit}
              onDelete={(contact) => {
                setContactToDelete(contact);
                setConfirmOpen(true);
              }}
              onView={(contact) => setViewingContact(contact)}
            />
          </motion.div>
        )}

        {/* Modals */}
        <ContactModal
          mode={editingContact ? 'edit' : 'create'}
          contact={editingContact}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
        />

        <ConfirmDelete
          isOpen={confirmOpen}
          contactName={contactToDelete?.name}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            if (contactToDelete) handleDelete(contactToDelete.id);
          }}
        />

        <ContactViewModal
          isOpen={!!viewingContact}
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
        />

        {/* Toaster */}
        {toast && (
          <Toaster
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </main>
  );
}
