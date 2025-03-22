import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import router from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL || "https://pttkhtweb.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "https://pttkhtweb.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({ message: "Bán rau sạch nhóm 9" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
