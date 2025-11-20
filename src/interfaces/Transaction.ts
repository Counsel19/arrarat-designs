import mongoose, { Document } from 'mongoose';

export interface TransactionCustomerT {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
}

export interface TransactionT extends Document {
  order: mongoose.Schema.Types.ObjectId;
  invoice: mongoose.Schema.Types.ObjectId;
  invoiceNumber: string;
  amount: number;
  currency: string;
  reference?: string;
  note?: string;
  customer: TransactionCustomerT;
  status: 'pending' | 'confirmed' | 'failed';
  confirmedAt?: Date;
  confirmedBy?: mongoose.Schema.Types.ObjectId;
  metadata?: Record<string, any>;
}

export default TransactionT;

