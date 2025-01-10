import request from 'supertest';
import app from '../../app.js'; // Importa o app da API
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { bookData, authorData, publisherData } from '../../mockdata/testData.js'; // Importa os dados de teste
import { books } from '../../models/Book.js'; // Substitua pelo caminho correto do modelo Livro
import { author } from '../../models/Author.js'; // Substitua pelo caminho correto do modelo Autor
import { publisher } from '../../models/Publisher.js'; // Substitua pelo caminho correto do modelo Editora

let mongoServer;

beforeAll(async () => {
  // Inicializa o MongoDB em memória
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  const cleanPublisherMock = cleanMock(publisherData);
  const cleanAuthorMock = cleanMock(authorData);
  const cleanBookMock = cleanMock(bookData);
  // Popula os dados mock no banco
  await author.create(cleanAuthorMock);
  await publisher.create(cleanPublisherMock);
  await books.create(cleanBookMock);
});
const cleanMock = (obj) => {
  return JSON.parse(JSON.stringify(obj, (key, value) => (value === '' ? undefined : value)));
};

afterAll(async () => {
  // Desconecta e encerra o servidor MongoDB em memória
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Book Controller', () => {
  test('Deve retornar uma lista de livros', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(bookData.length); // Verifica se a quantidade corresponde ao mock
  });

  test('Deve retornar um livro específico', async () => {
    const response = await request(app).get(`/books/${bookData[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', bookData[0]._id.toString());
    expect(response.body).toHaveProperty('titulo', bookData[0].titulo);
  });
});

test('Deve atualizar o título de um livro pelo ID', async () => {
  const novoTitulo = 'Título Atualizado';
  const response = await request(app).put(`/books/${bookData[0]._id}`).send({ titulo: novoTitulo });

  expect(response.status).toBe(200); // Verifica o status HTTP
  expect(response.body).toHaveProperty('_id', bookData[0]._id.toString());
  expect(response.body).toHaveProperty('titulo', novoTitulo); // Verifica o título atualizado
});

test('Deve excluir um livro pelo ID', async () => {
  const response = await request(app).delete(`/books/${bookData[0]._id}`);

  expect(response.status).toBe(204); // Verifica o status HTTP
});
