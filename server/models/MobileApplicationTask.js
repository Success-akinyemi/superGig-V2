import mongoose from "mongoose";

const MobileApplicationTaskSchema = new mongoose.Schema({
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

const MobileApplicationTaskModel = mongoose.model('mobileApplicationTask', MobileApplicationTaskSchema)
export default MobileApplicationTaskModel