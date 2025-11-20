import mongoose, { Schema } from 'mongoose';

import { InvoiceT } from '@src/interfaces';

const invoiceSchema = new Schema<InvoiceT>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    amountDue: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'NGN',
      uppercase: true,
      trim: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },
    documentPath: {
      type: String,
      trim: true,
    },
    documentUrl: {
      type: String,
      trim: true,
    },
    whatsappMessageUrl: {
      type: String,
      trim: true,
    },
    adminWhatsappSnapshot: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'paid'],
      default: 'pending',
      lowercase: true,
      trim: true,
    },
    sentAt: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Invoice || mongoose.model<InvoiceT>('Invoice', invoiceSchema);

