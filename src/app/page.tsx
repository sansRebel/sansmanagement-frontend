'use client';

import { useEffect, useState } from 'react';
import ContactTable from '@/components/ContactTable';
import ContactModal from '@/components/ContactModal';
import ConfirmDelete from '@/components/ConfirmDelete';
import ContactViewModal from '@/components/ContactViewModal';
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
      } else {
        const created = await createContact(data);
        setContacts((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error('Error saving contact:', err);
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
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
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 md:px-16 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Directory</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={openCreate}
          >
            + Add Contact
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/4"
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

        {loading && <p className="text-gray-500">Loading contacts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <ContactTable
            contacts={filteredContacts}
            onEdit={openEdit}
            onDelete={(contact) => {
              setContactToDelete(contact);
              setConfirmOpen(true);
            }}
            onView={(contact) => setViewingContact(contact)}
          />
        )}

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
      </div>
    </main>
  );
}
