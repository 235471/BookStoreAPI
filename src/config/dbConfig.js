import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Connecting using mongoDriver
export async function connectDB(connectionString) {
  let mongoClient;
  try {
    mongoClient = new MongoClient(connectionString);
    console.log('Establishing connection to database cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to Mongo Atlas!');

    return mongoClient;
  } catch (erro) {
    console.error('Database connection failed!', erro);
    process.exit();
  }
}

// Connecting with mongoose

export async function connectMongooseDB(connectionString) {
  mongoose.connect(connectionString);
  return mongoose.connection;
}
