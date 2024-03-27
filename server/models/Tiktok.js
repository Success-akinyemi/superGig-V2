import mongoose from "mongoose";

const TiktokSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Tiktok'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Tiktok profile url is needed'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const TiktokModel = mongoose.model('TiktokUser', TiktokSchema)
export default TiktokModel