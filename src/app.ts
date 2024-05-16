import express from 'express';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

// Error handling middleware
app.use(errorHandler);

export { app };
