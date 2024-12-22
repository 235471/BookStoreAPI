import { validateCNPJ } from '../utils/validateCPNJ.js';
import { publisher } from '../models/index.js';
import isValidEmail from '../utils/validateEmail.js';
import BaseError from '../erros/BaseError.js';
import validateSocialMedia from '../utils/validateSocialMedia.js';
import { validateCEP, formatCep } from '../utils/validateCEP.js';
import checkFormatPhone from '../utils/checkFormatPhone.js';
import buildQuery from '../utils/buildQuery.js';
import checkEmpty from '../utils/checkEmptyArray.js';

class PublisherController {
  static async listAllPublishers(req, res, next) {
    try {
      const publisherList = await publisher.find({});
      return res.status(200).json(publisherList);
    } catch (error) {
      next(error);
    }
  }
  static async listPublishersByQuery(req, res, next) {
    try {
      const query = buildQuery(req.query, publisher);
      const publisherList = await publisher.find(query);

      checkEmpty(publisherList, 'No Publishers found within these parameters');

      return res.status(200).json(publisherList);
    } catch (error) {
      next(error);
    }
  }
  static async savePublisher(req, res, next) {
    try {
      const cep = req.body.endereco.cep;
      const social = req.body.redesSociais;
      const email = req.body.email;
      const phone = req.body.telefone;
      // Validate format and if it's active within Brazil Government register
      const cnpjValidation = await validateCNPJ(req.body.cnpj);
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
