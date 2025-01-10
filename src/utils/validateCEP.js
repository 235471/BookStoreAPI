import cep from 'cep-promise';
import BaseError from '../erros/BaseError.js';

async function validateCEP(cepInput, endereco) {
  try {
    let cepFormat = cepInput.replace(/[^\d]/g, '');

    if (cepFormat.length !== 8) {
      throw new BaseError('Invalid CEP format', 400);
    }
    cepFormat = cepFormat.replace(/(\d{5})(\d{3})/, '$1-$2');

    const address = await cep(cepFormat);
    endereco.logradouro = address.street;
    endereco.bairro = address.neighborhood;
    endereco.cidade = address.city;
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
