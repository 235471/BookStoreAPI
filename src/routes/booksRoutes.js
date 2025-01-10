import express from 'express';
import LivroController from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', LivroController.listAllBooks);

router.get('/books/search', LivroController.listBooksByQuery);

router.get('/books/:id', LivroController.getBookById);

router.post('/books', LivroController.saveBook);

router.put('/books/:id', LivroController.updateBookById);

router.delete('/books/:id', LivroController.deleteBookById);

export default router;
