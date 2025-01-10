import Joi from 'joi';

const authorSchemaJoi = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Author name is required',
    'string.empty': 'Author name cannot be empty',
  }),
  nationality: Joi.string().trim().required().messages({
    'any.required': 'Author nationality is required',
    'string.empty': 'Author nationality cannot be empty',
  }),
  birthDate: Joi.string().trim().optional().messages({
    'string.empty': 'Birth date cannot be empty',
  }),
  biography: Joi.string().trim().optional().messages({
    'string.empty': 'Biography cannot be empty',
  }),
});

export default authorSchemaJoi;
