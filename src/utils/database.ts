import mongoose from 'mongoose';
import environment from '../config/environment';

async function connectDB() {
  const dbUri = environment.dbUri;

  try {
    await mongoose.connect(`${dbUri}`);
    console.info('Connected to DB');
  } catch (error) {
    console.error(`Could not connect to DB: ${error}`);
    process.exit(1);
  }
}

export default connectDB;
