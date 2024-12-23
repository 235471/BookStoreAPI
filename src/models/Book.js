import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
/**
 * @model Book
 * @description Represents a book entity in the database.
 * @property {string} titulo - The title of the book.
 * @property {string} lancamento - The publication year of the book
 * @property {number} paginas - Number of pages
 * @property {number} preco - Book price
 * @property {mongoose.Schema.Types.ObjectId} autor - Unique ID reference in database.
 * @property {mongoose.Schema.Types.ObjectId} editora - Unique ID reference in database.
 * @property {} publicationDate - The publication date of the book.
 */
const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, 'Book title is a required field'] },
    lancamento: { type: String },
    descricao: { type: String },
    paginas: {
      type: Number,
      validate: {
        validator: (pages) => {
          return pages >= 20 && pages <= 5000;
        },
        message: 'Page numbers must be between 20 - 5000. Input value  {VALUE}', // mongoose internal uses {VALUE} to substitute for input value
      },
    },
    preco: { type: Number, min: 0 },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, 'Author information is required'],
      autopopulate: true,
    },
    editora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'editora',
      required: [true, 'Publisher information is required'],
      autopopulate: true,
    },
  },
  { versionKey: false }
);

livroSchema.statics.queryConfig = {
  titulo: 'regex',
  lancamento: 'exact',
  'autor.name': 'regex',
  'autor.nationality': 'regex',
  'editora.razaoSocial': 'regex',
  'editora.nomeFantasia': 'regex',
  'editora.cnpj': 'exact',
  'editora.telefone': 'exact',
  'editora.email': 'regex',
  'editora.status': 'exact',
  minPreco: 'exact',
  maxPreco: 'exact',
  minPaginas: 'exact',
  maxPaginas: 'exact',
};

// Indexes for search by title and price
livroSchema.index({ titulo: 1 });
livroSchema.index({ preco: 1 });

livroSchema.plugin(autopopulate);

const books = mongoose.model('Livros', livroSchema, 'Livros');

export { books, livroSchema };
