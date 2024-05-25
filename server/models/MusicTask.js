import mongoose from "mongoose";

const MusicTaskSchema = new mongoose.Schema({
    platformCode: {
        type: String
    },
    taskId: {
        type: String
    },
    task: {
        type: String
    },
    pricePerFreelancer: {
        type: Number
    },
    unitPrice: {
        type: Number
    },
    minWorkers: {
        type: Number
    },
    createdBy: {
        type: String
    }
},
{timestamps: true}
)

const MusicTaskModel = mongoose.model('musicTask', MusicTaskSchema)
export default MusicTaskModel