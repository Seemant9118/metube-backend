import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// app 
const app = express();

// middleware's
app.use(cors({
    origin: process.env.frontend_app_URL,
    credentials: true,
}));

app.use(express.json({ limit: '20kb' }));

app.use(express.urlencoded({ extended: true, limit: '20kb' }));

app.use(express.static('public'));

app.use(cookieParser());


// routes
import userRoutes from './modules/user/user.route.js';

app.use('/api/v1/users', userRoutes); // endpoint : http://localhost:5000/api/v1/users/xxxxx

export default app;