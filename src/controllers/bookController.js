import { books, author, publisher } from '../models/index.js';
import NotFound from '../erros/NotFound.js';
import buildQuery from '../utils/buildQuery.js';
import separateQueryParams from '../utils/separateQuery.js';
import { checkEmpty, isObjectEmpty } from '../utils/checkEmpty.js';

class LivroController {
  static async createBookWithOrWithoutAuthor(req, res, next) {
    try {
      const newBooks = req.body;
      const findAuthor = await author.findById(newBooks.autor);
      const findPublisher = await publisher.findById(newBooks.editora);
      if (findAuthor && findPublisher) {
        const completeBooks = { ...newBooks, autor: { ...findAuthor._doc }, editora: { ...findPublisher._doc } };
        const savedBooks = await books.insertMany(completeBooks);
        return res.status(201).json({ message: 'Registration successful!', books: savedBooks });
      } else {
        if (!findAuthor) throw new NotFound('Author not found');

        if (!findPublisher) throw new NotFound('Publisher not found');
      }
    } catch (error) {
      next(error);
    }
  }
  static async listAllBooks(req, res, next) {
    try {
      const bookList = await books.find({}).populate(['autor', 'editora']).exec();
      checkEmpty(bookList);
      return res.status(200).json(bookList);
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
      // If any of the book attributes were used as search parameters
      let bookList = [];
      const bookQueryBuilt = buildQuery(bookQuery, books);
      if (isObjectEmpty(bookQueryBuilt) && isObjectEmpty(authorQuery) && isObjectEmpty(publisherQuery)) {
        return res.status(200).json([]);
      }
      if (!isObjectEmpty(bookQueryBuilt)) {
        bookList = await books.find(bookQueryBuilt).populate(['autor', 'editora']).exec();
        // Throw not found
        checkEmpty(bookList);

        // Check if any properties related to author or publisher are included in the query
        if (Object.keys(authorQuery).length > 0 || Object.keys(publisherQuery).length > 0) {
          // Filter books that match the specified author and publisher
          bookList = await LivroController.filterByAuthorOrPublisher(bookList, authorQuery, publisherQuery);
        }
      } else {
        bookList = await LivroController.searchByAuthorOrPublisher(authorQuery, publisherQuery);
      }

      return res.status(200).json(bookList);
    } catch (error) {
      next(error);
    }
  }
  static async searchByAuthorOrPublisher(authorQuery, publisherQuery) {
    // Get Author and Publisher ID based on the query
    const authorIds = await LivroController.getIdsByQuery(authorQuery, author);
    const publisherIds = await LivroController.getIdsByQuery(publisherQuery, publisher);
    // Search any book matches by author and publisher
    return books
      .find({
        ...(authorIds ? { autor: { $in: authorIds } } : {}),
        ...(publisherIds ? { editora: { $in: publisherIds } } : {}),
      })
      .populate(['autor', 'editora'])
      .exec();
  }

  static async filterByAuthorOrPublisher(bookList, authorQuery, publisherQuery) {
    // Get Author and Publisher ID based on the query
    const authorIds = await LivroController.getIdsByQuery(authorQuery, author);
    const publisherIds = await LivroController.getIdsByQuery(publisherQuery, publisher);

    // Filter the books found matching with authors and publishers
    return bookList.filter((book) => {
      const isAuthorMatch = authorIds ? authorIds.some((id) => id.equals(book.autor._id)) : true;
      const isPublisherMatch = publisherIds ? publisherIds.some((id) => id.equals(book.editora._id)) : true;

      return isAuthorMatch && isPublisherMatch;
    });
  }
  static async getBookById(req, res, next) {
    const id = req.params.id;
    try {
      const book = await books.findById(id).populate(['autor', 'editora']).exec();
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
      return await LivroController.createBookWithOrWithoutAuthor(req, res);
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
