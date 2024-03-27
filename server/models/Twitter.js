import mongoose from "mongoose";

const TwitterSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Twitter'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Twitter profile url is neede'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const TwitterModel = mongoose.model('TwitterUser', TwitterSchema)
export default TwitterModel