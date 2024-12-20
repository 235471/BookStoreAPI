import BaseError from '../erros/BaseError.js';

function checkFormatPhone(phoneNumber) {
  const phoneRegex = /\d{10,11}/;
  return phoneNumber.map((phone) => {
    if (/[a-zA-Z]/.test(phone)) {
      throw new BaseError('Phone number must not contain letters', 400);
    }
    const cleanedPhone = phone.replace(/[^\d]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      throw new BaseError('Phone number must contain 10 or 11 digits', 400);
    } else {
      return cleanedPhone;
    }
  });
}

export default checkFormatPhone;
