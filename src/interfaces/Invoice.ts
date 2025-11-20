import mongoose, { Document } from 'mongoose';

export interface InvoiceCustomerT {
  name: string;
  email: string;
  phone: string;
}

export interface InvoiceT extends Document {
  order: mongoose.Schema.Types.ObjectId;
  invoiceNumber: string;
  amountDue: number;
  currency: string;
  customer: InvoiceCustomerT;
  documentPath?: string;
  documentUrl?: string;
  whatsappMessageUrl?: string;
  adminWhatsappSnapshot?: string;
  status: 'pending' | 'sent' | 'paid';
  sentAt?: Date;
  paidAt?: Date;
}

export default InvoiceT;

