import mongoose from "mongoose";

const MasterIncomeSchema = new mongoose.Schema({
    totalIncome: {
        type: Number,
        default: 0
    },
    totalExpense: {
        type: Number,
        default: 0,
    }
},
{timestamps: true}
)

const MasterIncomeModel = mongoose.model('masterIncome', MasterIncomeSchema)
export default MasterIncomeModel