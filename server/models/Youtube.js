import mongoose from "mongoose";

const YoutubeSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Youtube'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Youtube profile url is needed'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const YoutubeModel = mongoose.model('YoutubeUser', YoutubeSchema)
export default YoutubeModel