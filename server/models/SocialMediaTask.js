import mongoose from "mongoose";

const SocialMediaTaskSchema = new mongoose.Schema({
    platformCode: {
        type: String
    },
    taskId: {
        type: String
    },
    task: {
        type: String
    },
    taskId: {
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

const SocialMediaTaskModel = mongoose.model('SocialMediaTask', SocialMediaTaskSchema)
export default SocialMediaTaskModel