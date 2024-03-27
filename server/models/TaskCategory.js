import mongoose from "mongoose";

const TaskCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    createdby: {
        type: String
        //use user id
    }
},
{timestamps: true}
)

const TaskCategoryModel = mongoose.model('taskCategory', TaskCategorySchema)
export default TaskCategoryModel