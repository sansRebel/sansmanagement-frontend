export type ContactCategory = 'Customer' | 'Vendor' | 'VIP' | 'Partner' | 'Employee';

export interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    company?: string | null;
    category: ContactCategory;
}
