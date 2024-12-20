import { author } from '../models/index.js';
import NotFound from '../erros/NotFound.js';
import buildQuery from '../utils/buildQuery.js';

class AuthorController {
  static async listAllAuthors(req, res, next) {
    try {
      const query = buildQuery(req.query, author);
      const authorList = await author.find(query);
      return res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  }
  static async getAuthorById(req, res, next) {
    const id = req.params.id;
    try {
      const authors = await author.findById(id);
      if (!authors) {
        throw new NotFound('Author not found');
      }
      return res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  }
  static async saveAuthor(req, res, next) {
    try {
      const newAuthor = await author.insertMany(req.body);
      res.status(201).json({ message: 'Registration successful!', books: newAuthor });
    } catch (error) {
      next(error);
    }
  }
  static async updateAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const updateAuthor = await author.findByIdAndUpdate(id, req.body, { new: true });

      if (!updateAuthor) {
        throw new NotFound('No author found with the requested id');
      }

      return res.status(200).json(updateAuthor);
    } catch (error) {
      next(error);
    }
  }
  static async deleteAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const deletedAuthor = await author.findByIdAndDelete(id);

      if (!deletedAuthor) {
        throw new NotFound('Author not found');
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async listAuthorsByQuery(req, res, next) {
    try {
      const query = buildQuery(req.query, author);
      const authorList = await author.find(query);

      if (!authorList) throw new NotFound('No Authors found within these parameters');

      res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
