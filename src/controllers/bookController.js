import { books, author, publisher } from '../models/index.js';
import NotFound from '../erros/NotFound.js';
import buildQuery from '../utils/buildQuery.js';
import separateQueryParams from '../utils/separateQuery.js';
import { checkEmpty, isObjectEmpty } from '../utils/checkEmpty.js';
import paginationObject from '../utils/pagination.js';
import InvalidRequisition from '../erros/InvalidRequisition.js';
import bookSchemaJoi from '../validations/bookValidation.js';
import { ObjectId } from 'mongodb';
class LivroController {
  static async findAuthorAndPublisher(authorId, publisherId) {
    // Find the author and publisher by ID
    return Promise.all([author.findById(authorId), publisher.findById(publisherId)]);
  }

  static validateAuthorAndPublisher(findAuthor, findPublisher) {
    // Validate if both author and publisher exist in the database
    if (!findAuthor && !findPublisher) {
      throw new NotFound('Author and Publisher not found');
    }
    // Validate if the author exist in the database
    if (!findAuthor) {
      throw new NotFound('Author not found');
    }
    // Validate if the publisher exist in the database
    if (!findPublisher) {
      throw new NotFound('Publisher not found');
    }
  }
  static objectIdValidation(id, name) {
    // Convert the ID to mongo ObjectId
    try {
      return new ObjectId(id);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvalidRequisition(`${name} has an invalid ID`); // conversion error
    }
  }
  static async createBook(req, res, next) {
    try {
      // Validate the request body using the Joi schema
      const { error, value } = bookSchemaJoi.validate(req.body, { abortEarly: false });
      // If any error occurs during joi validation, it will be caught here
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message).join(', '); // Get all error messages in a single string
        throw new InvalidRequisition(errorMessages); // Send custom error message to handler
      }
      const { autor, editora, ...newBooks } = value; // Get author and publisher and book info from request body

      const autorId = LivroController.objectIdValidation(autor, 'Author', next);
      const editoraId = LivroController.objectIdValidation(editora, 'Author', next);
      // Get the author and publisher from the database
      const [findAuthor, findPublisher] = await LivroController.findAuthorAndPublisher(autorId, editoraId);
      // Validate if the author and publisher exist in the database
      LivroController.validateAuthorAndPublisher(findAuthor, findPublisher);
      // Create the new book with the author, publisher, book information
      const completeBooks = { ...newBooks, autor: autorId, editora: editoraId };
      const savedBooks = await books.insertMany(completeBooks);
      // Return the response with the created book
      return res.status(201).json({ message: 'Registration successful!', books: savedBooks });
    } catch (error) {
      next(error);
    }
  }
  static async listAllBooks(req, res, next) {
    try {
      const bookList = books.find({});
      req.result = bookList;
      const result = await paginationObject(req, next);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  // Find Author and Publisher Id's with Query
  static async getIdsByQuery(query, model) {
    if (Object.keys(query).length > 0) {
      const results = await model.find(buildQuery(query, model));
      return results.map((item) => item._id);
    }
    return null;
  }
  static async listBooksByQuery(req, res, next) {
    try {
      const { bookQuery, authorQuery, publisherQuery } = separateQueryParams(req.query);
      let result;
      let query = {};
      // If any of the book attributes were used as search parameters
      const bookQueryBuilt = buildQuery(bookQuery, books);
      if (isObjectEmpty(bookQueryBuilt) && isObjectEmpty(authorQuery) && isObjectEmpty(publisherQuery)) {
        return res.status(200).json([]);
      }
      // Workflow 1: Query contain book information that needs to be filter first then match records filtering by Author and/or Publisher and apply pagination
      // Workflow 2: Search for books that match the Author and/or Publisher and apply pagination
      if (!isObjectEmpty(bookQueryBuilt)) {
        query = bookQueryBuilt;

        // Check if any properties related to author or publisher are included in the query
        if (Object.keys(authorQuery).length > 0 || Object.keys(publisherQuery).length > 0) {
          // Filter books that match the specified author and publisher
          const additionalQuery = await LivroController.prepareQueryByAuthorOrPublisher(authorQuery, publisherQuery);
          query = { ...query, ...additionalQuery };
        }
        // Execute the final query in MongoDB
        const bookList = books.find(query);
        // Apply pagination
        req.result = bookList;
        result = await paginationObject(req, next); // Apply pagination to books result
        checkEmpty(result); // Throw not found
      } else {
        // Search books that match by author and/or publisher
        query = await LivroController.prepareQueryByAuthorOrPublisher(authorQuery, publisherQuery);
        // Apply result to handle pagination
        req.result = books.find(query);
        result = await paginationObject(req, next); // Apply pagination to books result
        checkEmpty(result); // Throw not found
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static prepareMongoseQuery(authorIds, publisherIds) {
    let query = {};

    if (authorIds && authorIds.length > 0) {
      query.autor = { $in: authorIds };
    }

    if (publisherIds && publisherIds.length > 0) {
      query.editora = { $in: publisherIds };
    }

    return query;
  }

  static async prepareQueryByAuthorOrPublisher(authorQuery, publisherQuery) {
    // Get Author and Publisher ID based on the query
    const authorIds = await LivroController.getIdsByQuery(authorQuery, author);
    const publisherIds = await LivroController.getIdsByQuery(publisherQuery, publisher);

    // Prepare the query for Mongoose based on IDs
    const query = LivroController.prepareMongoseQuery(authorIds, publisherIds);
    return query;
  }
  static async getBookById(req, res, next) {
    const id = req.params.id;
    try {
      const book = await books.findById(id);
      if (!book) {
        throw new NotFound('Book not found');
      }
      return res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
  static async saveBook(req, res, next) {
    try {
      return await LivroController.createBook(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  static async updateBookById(req, res, next) {
    try {
      const id = req.params.id;
      const updatebook = await books.findByIdAndUpdate(id, req.body, { new: true });
      checkEmpty(updatebook);
      return res.status(200).json(updatebook);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBookById(req, res, next) {
    try {
      const id = req.params.id;
      const deletedBook = await books.findByIdAndDelete(id);

      if (!deletedBook) {
        throw new NotFound('Book not found');
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;
