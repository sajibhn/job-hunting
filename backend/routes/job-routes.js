import express from 'express'
import { addJobs, deleteJobs, getAllJobs, updateJobs } from '../controllers/job-controller.js'

const jobRouter = express.Router()

jobRouter.get("/", getAllJobs)
jobRouter.post("/add", addJobs)
jobRouter.put("/update/:id", updateJobs)
jobRouter.delete("/delete/:id", deleteJobs)

export default jobRouter