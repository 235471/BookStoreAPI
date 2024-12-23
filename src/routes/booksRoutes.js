import express from 'express';
import LivroController from '../controllers/bookController.js';
import paginationMiddleware from '../middleware/paginationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Book Routes
 *   description: CRUD operations for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns a list of books
 *     description: Retrieve all books available in the store
 *     tags: [Book Routes]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Bad request, No Books found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/books', LivroController.listAllBooks, paginationMiddleware);
/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Returns a list of books within the defined query
 *     description: Retrieve all books that match the query
 *     tags: [Book Routes]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: false
 *         description: The title of the book to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: autor
 *         required: false
 *         description: The author of the book to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request, invalid query
 *       404:
 *         description: Not Found, No Books found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/books/search', LivroController.listBooksByQuery);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Returns a single book by it's ID
 *     description: This route allows to retrieve one book by it's id
 *     tags: [Book Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book you want to display
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: One book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 *       404:
 *         description: The book with the specified ID was not found.
 */
router.get('/books/:id', LivroController.getBookById);
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book to the database
 *     description: This route allow you to save books
 *     tags: [Book Routes]
 *     responses:
 *       201:
 *         description: Book created successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *          description: Bad request, invalid input data (e.g., missing author or publisher)
 *       404:
 *         description: The specified author or publisher does not exist in the database
 *       500:
 *         description: Internal server error
 */
router.post('/books', LivroController.saveBook);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: This route allows you to update the details of an existing book by its ID.
 *     tags: [Book Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book you want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'  # Refers to the Book schema for the body data
 *     responses:
 *       200:
 *         description: Book updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request, invalid input data (e.g., missing required fields)
 *       404:
 *         description: Book not found in the database
 *       500:
 *         description: Internal server error
 */
router.put('/books/:id', LivroController.updateBookById);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     description: This route allows you to delete a existing book by its ID.
 *     tags: [Book Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book you want to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully!
 *       404:
 *         description: Book to be deleted not found in the database
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', LivroController.deleteBookById);

export default router;
