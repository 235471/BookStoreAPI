import NotFound from '../erros/NotFound.js';

function checkEmpty(list, message) {
  if (!list || list.length === 0) {
    throw new NotFound(message);
  }
}

function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
}

export { checkEmpty, isObjectEmpty };
