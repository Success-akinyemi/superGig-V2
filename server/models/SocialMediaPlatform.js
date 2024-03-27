import mongoose from "mongoose";

const SocialMediaPlatformSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    icon: {
        type: String
    },
    taskCategoryCode: {
        type: String
    },
    createdby: {
        type: String
        //use user id
    }
},
{timestamps: true}
)

const SocialMediaPlatformModel = mongoose.model('SocialMediaPlatform', SocialMediaPlatformSchema)
export default SocialMediaPlatformModel