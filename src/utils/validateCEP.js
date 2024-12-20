import cep from 'cep-promise';
import BaseError from '../erros/BaseError.js';

async function validateCEP(cepInput) {
  try {
    let cepFormat = cepInput.replace(/[^\d]/g, '');

    if (cepFormat.length !== 8) {
      throw new BaseError('Invalid CEP format', 400);
    }
    cepFormat = cepFormat.replace(/(\d{5})(\d{3})/, '$1-$2');

    const address = await cep(cepFormat);
    const { logradouro, bairro, cidade, municipio } = address;
    return { logradouro, bairro, cidade, municipio };
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new BaseError('Invalid CEP', 400);
  }
}

function formatCep(cep) {
  const format = cep.replace(/[^\d]/g, '');
  return format;
}

export { validateCEP, formatCep };
