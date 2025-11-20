import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

import { OrderT } from '@src/interfaces';
import { ensureDirectoryExists } from './ensureDirectoryExists';

type GenerateInvoicePdfParams = {
  order: OrderT;
  invoiceNumber: string;
};

export const generateInvoicePdf = async ({ order, invoiceNumber }: GenerateInvoicePdfParams) => {
  const invoicesDir = ensureDirectoryExists(path.resolve(process.cwd(), 'public', 'invoices'));
  const fileName = `${invoiceNumber}.pdf`;
  const absolutePath = path.resolve(invoicesDir, fileName);
  const relativePath = `/static/invoices/${fileName}`;

  const pdfDoc = new PDFDocument({ margin: 40 });

  return new Promise<{ absolutePath: string; relativePath: string }>((resolve, reject) => {
    const stream = fs.createWriteStream(absolutePath);
    pdfDoc.pipe(stream);

    pdfDoc.fontSize(26).text('Invoice', { align: 'center' });
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text(`Invoice No: ${invoiceNumber}`);
    pdfDoc.text(`Order ID: ${order._id}`);
    pdfDoc.text(`Customer: ${order.user?.name || ''} ${order.user?.surname || ''}`);
    pdfDoc.text(`Email: ${order.user?.email}`);
    pdfDoc.text(`Phone: ${order.user?.phone}`);
    pdfDoc.moveDown();

    pdfDoc.fontSize(16).text('Items');
    pdfDoc.moveDown(0.5);

    order.orderItems.forEach((item: any, index: number) => {
      const productName = item?.nameSnapshot || item?.product?.name || `Item ${index + 1}`;
      const unitPrice = item?.unitPrice || item?.product?.price || 0;
      const quantity = item?.quantity || 0;
      const lineTotal = unitPrice * quantity;
      pdfDoc.fontSize(12).text(`${productName} - ${quantity} x ₦${unitPrice.toLocaleString()} = ₦${lineTotal.toLocaleString()}`);
    });

    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text(`Sub Total: ₦${order.subTotal?.toLocaleString?.() || '0'}`);
    pdfDoc.text(`Shipping: ₦${order.shippingAmount?.toLocaleString?.() || '0'}`);
    pdfDoc.text(`Tax: ₦${order.textAmount?.toLocaleString?.() || '0'}`);
    pdfDoc.moveDown(0.5);
    pdfDoc.fontSize(14).text(`Total: ₦${order.totalAmount?.toLocaleString?.() || '0'}`);
    pdfDoc.moveDown(2);
    pdfDoc.fontSize(10).text('Thank you for shopping with Ararat Designs.');
    pdfDoc.end();

    stream.on('finish', () => resolve({ absolutePath, relativePath }));
    stream.on('error', reject);
  });
};

export default generateInvoicePdf;

