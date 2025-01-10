import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
// import swaggerSpec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';

const corsOptions = {
  origin: ['https://editor.swagger.io'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Load YALM document
const swaggerDocument = YAML.load('./src/docs/api-docs.yaml');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.use(errorHandler);

export default app;
