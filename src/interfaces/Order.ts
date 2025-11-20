import mongoose, { Document } from 'mongoose';
import { IUser } from './User';

export interface OrderedUser extends IUser {
  product: mongoose.Schema.Types.ObjectId;
  phone?: string;
}

export interface ShippingInfoT {
  address: string;
  phoneNo: string;
  zipCode: string;
  status: string;
  country: string;
  street: string;
  city: string;
}

export interface OrderItemT {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  nameSnapshot: string;
}

export interface OrderT extends Document {
  orderItems: OrderItemT[];
  user: OrderedUser;
  shippingInfo: ShippingInfoT;
  paymentMethod: string;
  textAmount: number;
  shippingAmount: number;
  subTotal: number;
  totalAmount: number;
  invoiceNumber?: string;
  invoice?: mongoose.Schema.Types.ObjectId;
  whatsappMessageUrl?: string;
  adminContactSnapshot?: string;
  statusHistory?: {
    status: string;
    note?: string;
    changedBy?: mongoose.Schema.Types.ObjectId;
    changedAt?: Date;
  }[];
  orderStatus: string;
  deliveredAt?: Date;
}

export interface ProcessingOrderT extends IUser, OrderT {}

