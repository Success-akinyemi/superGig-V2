import mongoose from "mongoose";

const MobileApplicationPlatformSchema = new mongoose.Schema({
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

const MobileApplicationPlatformModel = mongoose.model('musicPlatform', MobileApplicationPlatformSchema)
export default MobileApplicationPlatformModel