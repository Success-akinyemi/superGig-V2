import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Please Provide the task']
    },
    platform: {
        type: String,
    },
    platformCode: {
        type: String,
    },
    unitPrice: {
        type: Number,
    },
    pricePerFreelancer: {
        type: Number,
        required: true,
    },
    taskUrl: {
        type: String,
        required: [true, 'Please provide url link for the task']
    },
    taskImg: {
        type: Array
    },
    numberOfWorkers: {
        type: Number
    },
    completedRate: {
        type: Number,
        default: 0
    },
    approvedWorkers: [{
        freelancerName: {
            type: String
        },
        freelancerId: {
            type: String
        },
        freelancerUrl: {
            type: String
        },
        imageProof: {
            type: String
        }
    }],
    rejectedWorkers: [{
        freelancerName: {
            type: String
        },
        freelancerId: {
            type: String
        },
        freelancerUrl: {
            type: String
        },
        imageProof: {
            type: String
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers',
    },
},
{timestamps: true}
)


const TaskModel = mongoose.model('supergigTask', TaskSchema)
export default TaskModel