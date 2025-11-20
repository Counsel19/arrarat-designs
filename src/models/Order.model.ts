import mongoose, { Schema } from 'mongoose';

import { OrderT } from '@src/interfaces';
import { orderStatus } from '@src/constants';

export const orderSchema: Schema<OrderT> = new Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phoneNo: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      street: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    user: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please provide first name'],
      },
      surname: {
        type: String,
        required: [true, 'Please provide last name'],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        nameSnapshot: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: false,
      default: 'bank-transfer',
    },
    textAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    invoiceNumber: {
      type: String,
      trim: true,
      uppercase: true,
      index: true,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    whatsappMessageUrl: {
      type: String,
      trim: true,
    },
    adminContactSnapshot: {
      type: String,
      trim: true,
    },
    statusHistory: [
      {
        status: {
          type: String,
          trim: true,
        },
        note: {
          type: String,
          trim: true,
        },
        changedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    orderStatus: {
      type: String,
      required: true,
      enum: [
        orderStatus.pending,
        orderStatus.awaitingPayment,
        orderStatus.paymentConfirmed,
        orderStatus.completed,
        orderStatus.cancelled,
      ],
      default: orderStatus.awaitingPayment,
      trim: true,
      message: `Please select status only from shortlisted option (${Object.values(orderStatus).join(', ')})`,
    },
    deliveredAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compile model from schema and Exported
export default mongoose.models.Order || mongoose.model<OrderT>('Order', orderSchema);
