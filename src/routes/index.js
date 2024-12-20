import express from 'express';
import books from './booksRoutes.js';
import authors from './authorRoutes.js';
import publisher from './publisherRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Curso de Node.js'));

  app.use(express.json());
  app.use(books);
  app.use(authors);
  app.use(publisher);
};

export default routes;
