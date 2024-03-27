import mongoose from "mongoose";

const paymentOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    bankName: {
        type: String
    },
    accountName: {
        type: String
    },
    accountNumber: {
        type: Number
    },
    amount:{
        type: Number
    },
    status: {
        type: String,
        default: 'Pending'
    }
},
{timestamps: true}
)

const PaymentOrderModel = mongoose.model('PaymentOrder', paymentOrderSchema)
export default PaymentOrderModel