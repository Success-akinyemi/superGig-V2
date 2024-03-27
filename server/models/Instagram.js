import mongoose from "mongoose";

const InstagramSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Instagram'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Instagram profile url is needed'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const InstagramModel = mongoose.model('InstagramUser', InstagramSchema)
export default InstagramModel