export const buildWhatsappMessageLink = (phone: string, message: string) => {
  const normalizedPhone = phone.replace(/[^+\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone.replace('+', '')}?text=${encodedMessage}`;
};

export default buildWhatsappMessageLink;

