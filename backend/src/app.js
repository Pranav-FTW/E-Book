import express from 'express';

// CORS IS PACKAGE USE FOR , FROM WHERE WE ACCEPT OUR REQ
import cors from 'cors';

// USED TO SET (CURD OPRATION) ON USER COOKIES
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ORIGIN FROM WHERE WE ACCEPT OUR REQUEST
const allowedOrigins = [
  "https://e-book-blue.vercel.app"
];

app.use(cors({
  allowedOrigins,
  credentials: true
}));

app.use(cookieParser());

//HOW MANY KB OF DATA WE WILL BE ACCPETIG
app.use(express.json());

// HOW NAMY KB URL DATA ACCEPTING
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

//routes

app.get('/', (req, res) => {
  res.send('Hello world');
});

import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js'

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);


export { app };