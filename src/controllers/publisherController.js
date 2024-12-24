import { validateCNPJ } from '../utils/validateCPNJ.js';
import { publisher } from '../models/index.js';
import isValidEmail from '../utils/validateEmail.js';
import BaseError from '../erros/BaseError.js';
import validateSocialMedia from '../utils/validateSocialMedia.js';
import { validateCEP, formatCep } from '../utils/validateCEP.js';
import checkFormatPhone from '../utils/checkFormatPhone.js';
import buildQuery from '../utils/buildQuery.js';
import { checkEmpty, isObjectEmpty } from '../utils/checkEmpty.js';
import paginationObject from '../utils/pagination.js';
import publisherSchemaJoi from '../validations/publisherValidation.js';
import InvalidRequisition from '../erros/InvalidRequisition.js';

class PublisherController {
  static async listAllPublishers(req, res, next) {
    try {
      const publisherList = publisher.find({});
      req.result = publisherList;
      const result = await paginationObject(req, next);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async listPublishersByQuery(req, res, next) {
    try {
      const query = buildQuery(req.query, publisher);
      if (isObjectEmpty(query)) {
        res.status(200).json([]);
      }
      const publisherList = publisher.find(query);
      req.result = publisherList;
      const result = await paginationObject(req, next);

      checkEmpty(result, 'No Publishers found within these parameters');

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async savePublisher(req, res, next) {
    try {
      // Validate the request body using the Joi schema
      const { error, value } = publisherSchemaJoi.validate(req.body, { abortEarly: false });
      // If any error occurs during joi validation, it will be caught here
      if (error) {
        const errorMessages = error.details.map((erro) => erro.message).join(', '); // Get all error messages in a single string
        throw new InvalidRequisition(errorMessages); // Send custom error message to handler
      }
      const { cnpj } = value;
      const cep = req.body.endereco.cep;
      const social = req.body.redesSociais;
      const email = req.body.email;
      const phone = req.body.telefone;
      // Validate format and if it's active within Brazil Government register
      const cnpjValidation = await validateCNPJ(cnpj);
      if (cnpjValidation.valid) {
        if (req.body.razaoSocial.toLowerCase() !== cnpjValidation.data.razaoSocial.toLowerCase()) {
          throw new BaseError('The information you provided does not match the CNPJ records', 400);
        }
        req.body.cnpj = cnpjValidation.data.cnpj;
      }
      // Check the list of e-mails for any possible invalid ones
      if (email) isValidEmail(email);

      if (social) validateSocialMedia(social);

      if (cep) req.body.endereco = await validateCEP(cep);
      req.body.endereco.cep = formatCep(cep);
      if (phone) req.body.telefone = checkFormatPhone(phone);

      // Insert Publisher on the DataBase
      const newPublisher = await publisher.insertMany(req.body);
      res.status(201).json({ message: 'Registration successful!', publisher: newPublisher });
    } catch (error) {
      next(error);
    }
  }

  static async deletePublisherById(req, res, next) {
    try {
      const deletedPublisher = await publisher.findByIdAndDelete(req.params.id);

      checkEmpty(deletedPublisher, 'Error Publisher not found with the requested id');

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  static async updatePublisherById(req, res, next) {
    try {
      const updatedPublisher = await publisher.findByIdAndUpdate(req.params.id, req.body);

      checkEmpty(updatedPublisher, 'Error Publisher not found with the requested id');

      return res.status(200).send('Publisher updated successfully');
    } catch (error) {
      next(error);
    }
  }
  static async getPublisherById(req, res, next) {
    try {
      const publisherList = await publisher.findById(req.params.id);

      checkEmpty(publisherList, 'Error Publisher not found with the requested id');

      return res.status(200).json(publisherList);
    } catch (error) {
      next(error);
    }
  }
}

export default PublisherController;
