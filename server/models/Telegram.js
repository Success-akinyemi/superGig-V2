import mongoose from "mongoose";

const TelegramSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Telegram'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    accountValue: {
        type: String,
        required: [true, 'Telegram profile url is neede'],
        //unique: [true, 'Account url already exist']
    },
    isActive: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const TelegramModel = mongoose.model('TelegramUser', TelegramSchema)
export default TelegramModel