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
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());

//HOW MANY KB OF DATA WE WILL BE ACCPETIG
app.use(express.json());

// HOW NAMY KB URL DATA ACCEPTING
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

//routes

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js'

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);



export { app };