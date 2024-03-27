import mongoose from "mongoose";

const ThreadsSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Threads'
    },userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Threads profile url is needed'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const ThreadsModel = mongoose.model('ThreadsUser', ThreadsSchema)
export default ThreadsModel