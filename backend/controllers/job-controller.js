import mongoose from "mongoose";
import Job from "../model/Job.js";
import User from "../model/User.js";


export const getAllJobs = async (req, res) => {
    let jobs;

    try {
        jobs = await Job.find()
    } catch (err) {
        return console.log(err)
    }
    if (!jobs) {
        return res.status(400).json({ message: "No Jobs Found" })
    }

    return res.status(200).json({ jobs })
}

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let job;
    try {
        job = await Job.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "No Job Found" });
    }
    return res.status(200).json({ job });
};

export const addJobs = async (req, res) => {
    const { name, link, position, user } = req.body

    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (err) {
        return console.log(err)
    }

    const job = new Job({
        name,
        link,
        position,
        user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await job.save({ session })
        existingUser.jobs.push(job)
        await existingUser.save({ session })
        await session.commitTransaction()
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Unable To Find User By Id" })
    }

    if (!existingUser) {
        return res.status(400).json({ message: err })
    }

    try {
        job.save()
    } catch (err) {
        return console.log(err)
    }

    return res.status(200).json({ job })

}

export const updateJobs = async (req, res) => {
    const { name, link, position } = req.body

    const jobId = req.params.id
    let job;

    try {
        job = await Job.findByIdAndUpdate(jobId, {
            name,
            link,
            position
        })
    } catch (err) {
        return console.log(err)
    }

    if (!job) {
        return res.status(500).json({ message: "Unable To Update The Blog" })
    }

    return res.status(200).json({ job })
}

export const deleteJobs = async (req, res) => {
    const id = req.params.id

    let job;

    try {
        job = await Job.findByIdAndRemove(id).populate("user")
        await job.user.jobs.pull(job)
        await job.user.save()
    } catch (err) {
        return console.log(err)
    }

    if (!job) {
        return res.status(500).json({ message: "Unable to delete" })
    }

    return res.status(200).json({ message: "successfully deleted" })
}