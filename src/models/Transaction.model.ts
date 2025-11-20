import mongoose, { Schema } from 'mongoose';

import { TransactionT } from '@src/interfaces';

const transactionSchema = new Schema<TransactionT>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    amount: {
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
    reference: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    customer: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
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
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
      lowercase: true,
      trim: true,
    },
    confirmedAt: {
      type: Date,
    },
    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction || mongoose.model<TransactionT>('Transaction', transactionSchema);

