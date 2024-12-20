import { cnpj } from 'cpf-cnpj-validator';
import axios from 'axios';
import errorMessages from '../erros/errorObject.js';
import BaseError from '../erros/BaseError.js';

async function validateCNPJ(value) {
  // eslint-disable-next-line no-useless-escape
  const checkCnpj = value.replace(/[.\/-]/g, '');
  if (cnpj.isValid(checkCnpj)) {
    try {
      const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${checkCnpj}`);
      if (response.status !== 200 || response.data.status !== 'OK') {
        throw new BaseError(errorMessages.notFound, 404);
      }
      return {
        valid: true,
        data: {
          razaoSocial: response.data.nome,
          cnpj: checkCnpj,
        },
      };
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new BaseError(errorMessages.apiError, 500);
    }
  } else {
    throw new BaseError(errorMessages.invalidFormat, 400);
  }
}

export { validateCNPJ };
