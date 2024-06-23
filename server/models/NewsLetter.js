import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: [true, 'Email already exist']
    },
    phoneNumber: {
        type: String,
        unique: [true, 'Phone Number already exist']
    },
    name: {
        type: String,
        default: 'There'
    }
},
{timestamps: true}
)

const NewsLetterModel = mongoose.model('newsLetterSubscribers', NewsLetterSchema)
export default NewsLetterModel