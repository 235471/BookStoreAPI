import mongoose from 'mongoose';
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
    },
    editora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'editora',
      required: [true, 'Publisher information is required'],
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
  preco: 'range',
};
const books = mongoose.model('Livros', livroSchema, 'Livros');

export { books, livroSchema };
