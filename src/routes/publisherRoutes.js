import express from 'express';
import PublisherController from '../controllers/publisherController.js';

const router = express.Router();

router.get('/publisher', PublisherController.listAllPublishers);

router.get('/publisher/search', PublisherController.listPublishersByQuery);

router.get('/publisher/:id', PublisherController.getPublisherById);

router.post('/publisher', PublisherController.savePublisher);

router.put('/publisher/:id', PublisherController.updatePublisherById);

router.delete('/publisher/:id', PublisherController.deletePublisherById);

export default router;
