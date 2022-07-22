import express from 'express'
import mongoose from 'mongoose'
import router from './routes/user-routes.js';
import cors from 'cors'
import dotenv from 'dotenv'
import jobRouter from './routes/job-routes.js';
const app = express();

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api/user', router)
app.use('/api/jobs', jobRouter)

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000
mongoose.connect(`${MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT || 5000))
    .then(() => console.log('connected db and port'))
    .catch((err) => console.log(err))