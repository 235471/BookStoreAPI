import mongoose from 'mongoose';
/**
 * @model Author
 * @description Represents an author entity in the database.
 * @property {string} name - Author's name
 * @property {string} nationality - Author's nationality
 * @property {string} birthDate - Author's birthdate
 * @property {string} biography - Short biography about the author
 */
const authorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: [true, 'The name of the author is required'] },
    nationality: { type: String, required: [true, 'The nationality of the author is required'] },
    birthDate: { type: String },
    biography: { type: String },
  },
  { versionKey: false }
);

authorSchema.statics.queryConfig = {
  name: 'regex',
  nationality: 'regex',
};
// Indexes for search by name and nationality
authorSchema.index({ name: 1 });
authorSchema.index({ nationality: 1 });

const author = mongoose.model('autores', authorSchema);

export { author, authorSchema };
