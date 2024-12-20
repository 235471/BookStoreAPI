import express from 'express';
import AuthorController from '../controllers/authorController.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Author Routes
 *   description: CRUD operations for managing authors
 */

/**
 * @swagger
 * /author:
 *   get:
 *     summary: Returns a list of authors
 *     description: Retrieve all authors registered
 *     tags: [Author Routes]
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       404:
 *         description: Bad request, No Authors found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/author', AuthorController.listAllAuthors);
/**
 * @swagger
 * /author/search:
 *   get:
 *     summary: Returns a list of authors within the defined query
 *     description: Retrieve all authors that match the query
 *     tags: [Author Routes]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Author by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: nationality
 *         required: false
 *         description: Authors by nationality
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       400:
 *         description: Bad request, invalid query
 *       404:
 *         description: Not Found, No authors found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/author/search', AuthorController.listAuthorsByQuery);
/**
 * @swagger
 * /author/{id}:
 *   get:
 *     summary: Returns a single author by it's ID
 *     description: This route allows to retrieve one author by it's id
 *     tags: [Author Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author you want to display
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: One author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Internal server error
 *       404:
 *         description: The author with the specified ID was not found.
 */
router.get('/author/:id', AuthorController.getAuthorById);
/**
 * @swagger
 * /author:
 *   post:
 *     summary: Add a new author to the database
 *     description: This route allow you to save a new author
 *     tags: [Author Routes]
 *     responses:
 *       201:
 *         description: Author created successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       400:
 *          description: Bad request, invalid input data (e.g., missing name or nationality)
 *       500:
 *         description: Internal server error
 */
router.post('/author', AuthorController.saveAuthor);
/**
 * @swagger
 * /author/{id}:
 *   put:
 *     summary: Update an existing author
 *     description: This route allows you to update the details of an existing author by its ID.
 *     tags: [Author Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author you want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Bad request, invalid input data (e.g., missing required fields)
 *       404:
 *         description: Author not found in the database
 *       500:
 *         description: Internal server error
 */
router.put('/author/:id', AuthorController.updateAuthorById);
/**
 * @swagger
 * /author/{id}:
 *   delete:
 *     summary: Delete an existing author
 *     description: This route allows you to delete a existing author by its ID.
 *     tags: [Author Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author you want to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully!
 *       404:
 *         description: Author to be deleted not found in the database
 *       500:
 *         description: Internal server error
 */
router.delete('/author/:id', AuthorController.deleteAuthorById);

export default router;
