import NotFound from '../erros/NotFound';

function checkEmpty(list, message) {
  if (!list || list.length === 0) {
    throw new NotFound(message);
  }
}

export default checkEmpty;
