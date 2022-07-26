import express from 'express'
import { addJobs, deleteJobs, getAllJobs, getById, getByUserId, updateJobs } from '../controllers/job-controller.js'

const jobRouter = express.Router()

jobRouter.get("/", getAllJobs)
jobRouter.get("/:id", getById)
jobRouter.get("/user/jobs/:id", getByUserId)
jobRouter.post("/add", addJobs)
jobRouter.put("/update/:id", updateJobs)
jobRouter.delete("/delete/:id", deleteJobs)

export default jobRouter