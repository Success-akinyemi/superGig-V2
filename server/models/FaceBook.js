import mongoose from "mongoose";

const FacebookSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Facebook'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [ true, 'Facebook profile url is needed'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const FacebookModel = mongoose.model('FacebookUser', FacebookSchema)
export default FacebookModel