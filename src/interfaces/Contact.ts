import { Document } from 'mongoose';

export interface ContactT extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'replied';
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

