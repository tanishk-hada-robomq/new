import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

const startServer = async () => {
    try {
        app.listen(process.env.PORT, () => (console.log(`Server listening on port ${process.env.PORT}`)))
    } catch (error) {
        console.error('Failed to start the server: ', error.message)
    }
}

startServer()