export const generateInvoiceNumber = (counter = Math.floor(Math.random() * 9999)) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const suffix = `${counter}`.padStart(4, '0');
  return `INV-${year}${month}${day}-${suffix}`;
};

export default generateInvoiceNumber;

