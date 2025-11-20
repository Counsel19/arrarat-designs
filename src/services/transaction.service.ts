import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import Transaction from '@src/models/Transaction.model';
import Order from '@src/models/Order.model';
import Invoice from '@src/models/Invoice.model';
import { customResponse } from '@src/utils';
import { orderStatus } from '@src/constants';
import { sendPaymentConfirmationEmail } from '@src/utils/sendEmail';

export type ConfirmPaymentPayload = {
  orderId?: string;
  invoiceNumber?: string;
  amount: number;
  reference?: string;
  note?: string;
};

export const adminConfirmPaymentService = async (
  req: AuthenticatedRequestBody<IUser & ConfirmPaymentPayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, invoiceNumber, amount, reference, note } = req.body;
    const query = orderId ? { _id: orderId } : { invoiceNumber: invoiceNumber?.toUpperCase() };

    const order = await Order.findOne(query);

    if (!order) {
      return next(createHttpError(404, 'Order not found'));
    }

    if (![orderStatus.awaitingPayment, orderStatus.pending].includes(order.orderStatus as never)) {
      return next(createHttpError(400, 'Order is not awaiting payment'));
    }

    let invoice = await Invoice.findOne({ order: order._id });
    if (!invoice) {
      return next(createHttpError(404, 'Invoice not found for this order'));
    }

    const transaction = await Transaction.create({
      order: order._id,
      invoice: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      amount,
      currency: invoice.currency,
      reference,
      note,
      customer: {
        id: order.user.userId || req.user?._id,
        name: `${order.user.name} ${order.user.surname}`,
        email: order.user.email,
      },
      status: 'confirmed',
      confirmedAt: new Date(),
      confirmedBy: req.user?._id,
    });

    order.orderStatus = orderStatus.paymentConfirmed;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: orderStatus.paymentConfirmed,
      note: note || 'Payment confirmed',
      changedBy: req.user?._id,
      changedAt: new Date(),
    });
    await order.save();

    invoice.status = 'paid';
    invoice.paidAt = new Date();
    invoice = await invoice.save();

    await sendPaymentConfirmationEmail({
      customerEmail: order.user.email,
      customerName: order.user.name,
      invoiceNumber: invoice.invoiceNumber,
      orderId: order._id.toString(),
    });

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Payment confirmed successfully',
        data: { order, transaction },
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const getMyTransactionsService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions = await Transaction.find({ 'customer.id': req.user?._id }).sort({ createdAt: -1 });
    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Transactions fetched successfully',
        data: { transactions },
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const getAllTransactionsService = async (_req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Transactions fetched successfully',
        data: { transactions },
      })
    );
  } catch (error) {
    return next(error);
  }
};

