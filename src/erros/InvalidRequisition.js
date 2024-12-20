import baseError from './BaseError.js';

class InvalidRequisition extends baseError {
  constructor(message = 'One or more of the provided values are invalid.') {
    super(message, 400);
  }
}

export default InvalidRequisition;
