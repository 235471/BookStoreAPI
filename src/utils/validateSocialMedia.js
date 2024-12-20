import BaseError from '../erros/BaseError.js';

function validateSocialMedia(media) {
  const invalidUrls = media.reduce((errorMessage, website) => {
    // Regex para validar a URL
    const urlRegex = /^(https?:\/\/)?www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9%_.~+=&-]*)?$/;

    // Verifica se a URL não passa na regex
    if (!urlRegex.test(website)) {
      errorMessage += `Address ${website} is invalid. `;
    }

    return errorMessage;
  }, ''); // Inicializando a mensagem de erro com uma string vazia

  if (invalidUrls) {
    throw new BaseError(invalidUrls, 400);
  }
}

export default validateSocialMedia;
