import express from 'express';
import PublisherController from '../controllers/publisherController.js';
import paginationMiddleware from '../middleware/paginationMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Publisher Routes
 *   description: CRUD operations for managing publishers
 */

/**
 * @swagger
 * /publisher:
 *   get:
 *     summary: Returns a list of publishers
 *     description: Retrieve all publishers registered
 *     tags: [Publisher Routes]
 *     responses:
 *       200:
 *         description: A list of publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Bad request, No publishers found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/publisher', PublisherController.listAllPublishers, paginationMiddleware);
/**
 * @swagger
 * /publisher/search:
 *   get:
 *     summary: Returns a list of publishers within the defined query
 *     description: Retrieve all publishers that match the query
 *     tags: [Publisher Routes]
 *     parameters:
 *       - in: query
 *         name: razaoSocial
 *         required: false
 *         description: Publisher by company name
 *         schema:
 *           type: string
 *       - in: query
 *         name: cnpj
 *         required: false
 *         description: Publisher by cnpj register with government
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 *       400:
 *         description: Bad request, invalid query
 *       404:
 *         description: Not Found, No publishers found within these parameters
 *       500:
 *         description: Internal server error
 */
router.get('/publisher/search', PublisherController.listPublishersByQuery);
/**
 * @swagger
 * /publisher/{id}:
 *   get:
 *     summary: Returns a single publisher by it's ID
 *     description: This route allows to retrieve one publisher by it's id
 *     tags: [Publisher Routes]
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
router.get('/publisher/:id', PublisherController.getPublisherById);
/**
 * @swagger
 * /publisher:
 *   post:
 *     summary: Add a new publisher to the database
 *     description: This route allow you to save a new publisher
 *     tags: [Publisher Routes]
 *     responses:
 *       201:
 *         description: publisher created successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 *       400:
 *          description: Bad request, invalid input data (e.g., missing razaoSocial or cnpj)
 *       500:
 *         description: Internal server error
 */
router.post('/publisher', PublisherController.savePublisher);
/**
 * @swagger
 * /publisher/{id}:
 *   put:
 *     summary: Update an existing publisher
 *     description: This route allows you to update the details of an existing publisher by its ID.
 *     tags: [Publisher Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the publisher you want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publisher'
 *     responses:
 *       200:
 *         description: Publisher updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       400:
 *         description: Bad request, invalid input data (e.g., missing required fields)
 *       404:
 *         description: Publisher not found in the database
 *       500:
 *         description: Internal server error
 */
router.put('/publisher/:id', PublisherController.updatePublisherById);
/**
 * @swagger
 * /publisher/{id}:
 *   delete:
 *     summary: Delete an existing publisher
 *     description: This route allows you to delete a existing publisher by its ID.
 *     tags: [Publisher Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the publisher you want to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Publisher deleted successfully!
 *       404:
 *         description: Publisher to be deleted not found in the database
 *       500:
 *         description: Internal server error
 */
router.delete('/publisher/:id', PublisherController.deletePublisherById);

export default router;
