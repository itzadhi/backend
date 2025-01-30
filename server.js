import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import clickRoutes from './routes/clickRoutes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { storeUrlClicks } from './controllers/clickController.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Url Shortener API is running....');
});

app.use('/user', userRoutes);
app.use('/url', urlRoutes);
app.use('/click', clickRoutes);
app.use('/:shortenurl', storeUrlClicks);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
