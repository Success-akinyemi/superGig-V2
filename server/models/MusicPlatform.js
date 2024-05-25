import mongoose from "mongoose";

const MusicPlatformSchema = new mongoose.Schema({
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

const MusicPlatformModel = mongoose.model('musicPlatform', MusicPlatformSchema)
export default MusicPlatformModel