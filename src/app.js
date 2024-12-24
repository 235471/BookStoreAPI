import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Bookstore',
    version: '0.0.1',
    description: 'Comprehensive API documentation detailing the Create, Read, Update, and Delete (CRUD) operations for books, authors, and publishers.',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Ensure this matches your local server's URL
    },
  ],
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The MongoDB ObjectId of the book',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            description: 'The title of the book',
            example: 'The Great Gatsby',
          },
          lancamento: {
            type: 'string',
            description: 'Books publish year',
            example: '2020',
          },
          descricao: {
            type: 'string',
            description: 'Short description about the book',
            example: 'A marvelous fantasy setting in a new world',
          },
          paginas: {
            type: 'number',
            description: 'Number of pages the book has',
            example: 323,
          },
          preco: {
            type: 'number',
            description: 'Number of pages the book has',
            example: 50.95,
          },
          autor: {
            type: 'string',
            description: 'The MongoDB ObjectId of the author',
            example: '507f1f77bcf86cd799439011',
          },
          editora: {
            type: 'string',
            description: 'The MongoDB ObjectId of the publisher',
            example: '507f1f77bcf86cd799439011',
          },
        },
      },
      Author: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The MongoDB ObjectId of the author',
            example: '507f1f77bcf86cd799439011',
          },
          name: {
            type: 'string',
            description: 'Author name',
            example: 'J.R.R Tolkien',
          },
          nationality: {
            type: 'string',
            description: 'Country where he/she was born',
            example: 'Canada',
          },
          birthDate: {
            type: 'string',
            description: 'Birthday date',
            example: '2004-06-21',
          },
          biography: {
            type: 'string',
            description: 'Short biography',
            example: 'Jane Austen was an English novelist known for her witty social commentary and sharp observations of human nature',
          },
        },
      },
      Publisher: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The MongoDB ObjectId of the publisher',
            example: '507f1f77bcf86cd799439011',
          },
          razaoSocial: {
            type: 'string',
            description: 'Company legal name registered with the Government',
            example: 'GOOGLE BRASIL INTERNET LTDA',
          },
          nomeFantasia: {
            type: 'string',
            description: 'Name by the company is reconigzed by the public',
            example: 'Google',
          },
          cnpj: {
            type: 'string',
            description: 'Company register number with the Government',
            example: '11.122.204/0001-11',
          },
          telefone: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Publisher contact information',
              example: '(11) 95487-3281, (11) 3378-2278 ',
            },
          },
          endereco: {
            type: 'object',
            properties: {
              logradouro: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's street address",
                example: '5th Avenue',
              },
              bairro: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's district address",
                example: 'Brooklyn',
              },
              cidade: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's city address",
                example: 'New York',
              },
              municipio: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's state address",
                example: 'NY',
              },
              numero: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's address number",
                example: '5th Avenue, 105',
              },
              complemento: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's address complematary info",
                example: '5th Avenue, 105, 8th floor 807',
              },
              cep: {
                type: 'string',
                // eslint-disable-next-line quotes
                description: "Publisher's postal code",
                example: '01100-001',
              },
            },
          },
          email: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Publisher e-mail information',
              example: 'publisher@gmail.com, publisher@hotmail.com',
            },
          },
          website: {
            type: 'string',
            description: 'Publisher website',
            example: 'www.fantasybooks.com',
          },
          redesSociais: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Publisher social media info',
              example: 'www.instagram.com/fantasybooks, www.x.com/fantasybooks',
            },
          },
          status: {
            type: 'string',
            description: 'Company status with the Government',
            example: 'active or inactive',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Ensure this is correctly pointing to your route files
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app);

app.use(errorHandler);

export default app;
