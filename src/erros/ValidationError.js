import InvalidRequisition from './InvalidRequisition.js';

class ValidationError extends InvalidRequisition {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((erro) => erro.message)
      .join('; ');
    super(`Required fields are missing. ${errorMessage}`);
  }
}

export default ValidationError;
