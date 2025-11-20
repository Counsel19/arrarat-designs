import { Document } from 'mongoose';

export interface FAQT extends Document {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isActive?: boolean;
  createdBy?: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

