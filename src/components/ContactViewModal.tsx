'use client';

import { Contact } from '@/types/contact';

interface ContactViewModalProps {
    contact: Contact | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactViewModal({ contact, isOpen, onClose }: ContactViewModalProps) {
    if (!isOpen || !contact) return null;

    return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
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
        </div>
    </div>
    );
}
