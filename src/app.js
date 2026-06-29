import exprees from 'express';
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

app.use(static('public'));

app.use(cookieParser());

export default app;