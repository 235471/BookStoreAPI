import isEmail from 'validator/lib/isEmail.js';
import BaseError from '../erros/BaseError.js';

function isValidEmail(emailList) {
  const invalidEmail = emailList.reduce((acc, email) => {
    if (!isEmail(email)) acc += `Email ${email} is invalid`;
  }, '');
  if (invalidEmail) {
    throw new BaseError(invalidEmail, 400);
  }
}

export default isValidEmail;
