import { ObjectId } from 'mongodb';
import { connectDB, connectMongooseDB } from '../config/dbConfig.js';

// Connecting with DB either mongoDriver or Mongoose
// const connection         = await connectDB(process.env.DB_CONNECTION_STRING);

const connectionMongoose = await connectMongooseDB(process.env.DB_CONNECTION_STRING);

connectionMongoose.on('error', (error) => {
  console.error('Connection Error: ', error);
});

connectionMongoose.once('open', () => {
  console.log('Successfully connected to Mongo Atlas!');
});
