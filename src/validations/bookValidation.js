import Joi from 'joi';

const bookSchemaJoi = Joi.object({
  titulo: Joi.string().trim().required().messages({
    'any.required': 'Book title is required',
    'string.empty': 'Book title cannot be empty',
  }),
  lancamento: Joi.string().trim().allow('').messages({
    'string.base': 'Publish date must be a string in format YYYY-MM-DD',
  }),
  descricao: Joi.string().trim().allow('').messages({
    'string.base': 'Description must be a string',
  }),
  paginas: Joi.number().integer().min(20).max(5000).messages({
    'number.base': 'Number of pages must a be a number',
    'number.integer': 'Number of pages must be a integer',
    'number.min': 'Number of pages must be at least {#limit}',
    'number.max': 'Number of pages must be at most {#limit}',
  }),
  preco: Joi.number().min(0).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be at least {#limit}',
  }),
  autor: Joi.string().trim().required().messages({
    'any.required': 'Author information is required',
    'string.empty': 'Author cannot be empty',
  }),
  editora: Joi.string().trim().required().messages({
    'any.required': 'Publsiher information is required',
    'string.empty': 'Publisher cannot be empty',
  }),
});

export default bookSchemaJoi;
