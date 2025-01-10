import mongoose from 'mongoose';
import url from 'validator';
/**
 * @model Publisher
 * @description Represents an publisher entity in the database.
 * @property {string} razaoSocial  - Company legal name registered with the government
 * @property {string} nomeFantasia - Company public know name
 * @property {string} cnpj - Register number identification with the government
 * @property {string} telefone - Public contact phone numbers
 * @property {string} endereco - Address information
 * @property {string} email - Email for contact
 * @property {string} website - Website address
 * @property {string} redesSociais - Social media info
 * @property {string} status - Status with the government either active or inactive
 */
const publisherSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    razaoSocial: { type: String, required: true },
    nomeFantasia: { type: String, required: true },
    cnpj: { type: String, required: true },
    telefone: { type: [String] },
    endereco: {
      logradouro: { type: String },
      bairro: { type: String },
      cidade: { type: String },
      municipio: { type: String },
      numero: { type: String },
      complemento: { type: String, required: false },
      cep: { type: String },
    },
    email: { type: [String] },
    website: {
      type: String,
      validate: {
        validator: function (value) {
          return url.isURL(value, { require_protocol: false });
        },
        message: 'Please enter a valid website address.',
      },
    },
    redesSociais: { type: [String] },
    status: { type: String, enum: ['ativa', 'inativa'], default: 'ativa' },
  },
  { versionKey: false }
);

// Config for query management exact values or parcial values with regex
publisherSchema.statics.queryConfig = {
  razaoSocial: 'regex',
  nomeFantasia: 'regex',
  cnpj: 'exact',
  telefone: 'exact',
  email: 'regex',
  status: 'exact',
};
// Indexes for search by nomeFantasia
publisherSchema.index({ nomeFantasia: 1 });

const publisher = mongoose.model('editora', publisherSchema);

export { publisherSchema, publisher };
