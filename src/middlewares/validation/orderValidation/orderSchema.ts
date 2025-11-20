import Joi from 'joi';

// @ts-ignore
import JoiObjectId from 'joi-objectid';
import { orderStatus } from '@src/constants';

const vaildObjectId = JoiObjectId(Joi);

export const orderSchema = {
  processingOrder: Joi.object({
    paymentMethod: Joi.string().allow('', null),
    textAmount: Joi.number().min(0).default(0),
    shippingAmount: Joi.number().min(0).default(0),
    totalAmount: Joi.number().min(1),
    shippingInfo: Joi.object()
      .keys({
        address: Joi.string().required(),
        phoneNo: Joi.string().required(),
        zipCode: Joi.string().required(),
        status: Joi.string(),
        street: Joi.string(),
        city: Joi.string().required(),
        country: Joi.string().required(),
      })
      .required(),
    orderItems: Joi.array()
      .items(
        Joi.object()
          .keys({
            product: vaildObjectId().required().label('Invalid request (Please please provide vaild product id)'),
            quantity: Joi.number().min(1).required(),
          })
          .required()
      )
      .default([]),
  }),
  updateOrderStatus: Joi.object({
    orderStatus: Joi.string()
      .required()
      .valid(
        orderStatus.pending,
        orderStatus.awaitingPayment,
        orderStatus.paymentConfirmed,
        orderStatus.completed,
        orderStatus.cancelled
      ),
  }),
  validatedOrderId: Joi.object({
    orderId: vaildObjectId().required(),
  }),
  confirmPayment: Joi.object({
    orderId: vaildObjectId(),
    invoiceNumber: Joi.string().trim(),
    amount: Joi.number().min(0).required(),
    reference: Joi.string().allow('', null),
    note: Joi.string().allow('', null),
  }).or('orderId', 'invoiceNumber'),
};

export default orderSchema;
