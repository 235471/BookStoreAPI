import Joi from 'joi';

const publisherSchemaJoi = Joi.object({
  razaoSocial: Joi.string().trim().required().messages({
    'any.required': 'Publisher razaoSocial is required',
    'string.empty': 'Publisher razaoSocial cannot be empty',
  }),
  nomeFantasia: Joi.string().trim().required().messages({
    'any.required': 'Publisher nomeFantasia is required',
    'string.empty': 'Publisher nomeFantasia cannot be empty',
  }),
  cnpj: Joi.string().trim().required().messages({
    'any.required': 'Publisher cnpj is required',
    'string.empty': 'Publisher cnpj cannot be empty',
  }),
}).unknown();

export default publisherSchemaJoi;
