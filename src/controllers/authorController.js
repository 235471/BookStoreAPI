import InvalidRequisition from '../erros/InvalidRequisition.js';
import { author } from '../models/index.js';
import buildQuery from '../utils/buildQuery.js';
import { checkEmpty, isObjectEmpty } from '../utils/checkEmpty.js';
import paginationObject from '../utils/pagination.js';
import authorSchemaJoi from '../validations/authorValidation.js';

class AuthorController {
  static async listAllAuthors(req, res, next) {
    try {
      const authorList = author.find({});
      req.result = authorList;
      const result = await paginationObject(req, next);
      checkEmpty(result, 'No Authors found in the database');
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async getAuthorById(req, res, next) {
    const id = req.params.id;
    try {
      const authors = await author.findById(id);

      checkEmpty(authors, 'Author not found');

      return res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  }
  static async saveAuthor(req, res, next) {
    try {
      // Validate the request body using the Joi schema
      const { error, value } = authorSchemaJoi.validate(req.body, { abortEarly: false });
      // If any error occurs during joi validation, it will be caught here
      if (error) {
        const errorMessages = error.details.map((erro) => erro.message).join(', '); // Get all error messages in a single string
        throw new InvalidRequisition(errorMessages); // Send custom error message to handler
      }
      const newAuthor = value;
      const savedAuthor = await author.insertMany(newAuthor);
      res.status(201).json({ message: 'Registration successful!', author: savedAuthor });
    } catch (error) {
      next(error);
    }
  }
  static async updateAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const updateAuthor = await author.findByIdAndUpdate(id, req.body, { new: true });

      checkEmpty(updateAuthor, 'No author found with the requested id');

      return res.status(200).json(updateAuthor);
    } catch (error) {
      next(error);
    }
  }
  static async deleteAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const deletedAuthor = await author.findByIdAndDelete(id);

      checkEmpty(deletedAuthor, 'Author not found');

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async listAuthorsByQuery(req, res, next) {
    try {
      const query = buildQuery(req.query, author);
      if (isObjectEmpty(query)) {
        res.status(200).json([]);
      }
      const authorList = author.find(query);

      req.result = authorList;
      const result = await paginationObject(req, next);
      checkEmpty(result, 'No Authors found within these parameters');

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
