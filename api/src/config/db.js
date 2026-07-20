import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/property_dev';
  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || 'property',
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    throw err;
  }
};
