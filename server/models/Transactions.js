import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    action: {
        type: String,
        required: [true, 'Transaction action is Required']
    },
    amount: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    fundSource: {
        type: String
    },
    transactionId: {
        type: String
    },
    credit: {
        type: Boolean,
    }
},
{timestamps: true}
)

const TransactionModel = mongoose.model('superGigTransaction', TransactionSchema)
export default TransactionModel