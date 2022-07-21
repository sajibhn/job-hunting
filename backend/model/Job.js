import mongoose from "mongoose";

const Schema = mongoose.Schema

const jobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
})

export default mongoose.model("Job", jobSchema)