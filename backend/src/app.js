import express from 'express';
import cors from 'cors'; 
import userRouter from './routes/user.route.js'

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://cosmos-tqs9.onrender.com'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// route declaration 
app.use("/api/v1/users" , userRouter)

export { app }