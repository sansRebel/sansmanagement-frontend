'use client';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-red-600">Delete Contact</h2>
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{' '}
            <strong>{contactName || 'this contact'}</strong>?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
