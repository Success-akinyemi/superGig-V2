import mongoose from "mongoose";

const FundingSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    refrence: {
        type: String
    },
    amount: {
        type: String
    },
    verified: {
        type: Boolean
    }
},
{timestamps: true}
)

const FundingModel = mongoose.model('Funding', FundingSchema)
export default FundingModel