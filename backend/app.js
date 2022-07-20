import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(5000)