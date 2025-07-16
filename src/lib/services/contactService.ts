import api from '../api';
import { Contact } from '@/types/contact';

export const getAllContacts = async (): Promise<Contact[]> => {
    const res = await api.get('/contacts');
    return res.data;
    };

    export const getContactById = async (id: number): Promise<Contact> => {
    const res = await api.get(`/contacts/${id}`);
    return res.data;
    };

    export const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    const res = await api.post('/contacts', contact);
    return res.data;
    };

    export const updateContact = async (id: number, contact: Omit<Contact, 'id'>): Promise<Contact> => {
    const res = await api.put(`/contacts/${id}`, contact);
    return res.data;
    };

    export const deleteContact = async (id: number): Promise<Contact> => {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
};
