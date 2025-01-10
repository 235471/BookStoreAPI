import express from 'express';
import AuthorController from '../controllers/authorController.js';

const router = express.Router();

router.get('/author', AuthorController.listAllAuthors);

router.get('/author/search', AuthorController.listAuthorsByQuery);

router.get('/author/:id', AuthorController.getAuthorById);

router.post('/author', AuthorController.saveAuthor);

router.put('/author/:id', AuthorController.updateAuthorById);

router.delete('/author/:id', AuthorController.deleteAuthorById);

export default router;
