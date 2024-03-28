import crypto from 'crypto'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String
    },    
    lastName: {
        type: String,
    },
    profileimage: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/success-clone.appspot.com/o/user_1177568.png?alt=media&token=3c4010b0-526b-4f76-ae30-d0e74d76716e'
    },
    gender: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    earningWallet: {
        type: Number,
        default: 0
    },
    fundWallet: {
        type: Number,
        default: 0
    },
    completedTask: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    totalReferralEarnings: {
        type: Number,
        default: 0
    },
    totalWithdrawals: {
        type: Number,
        default: 0,
    },
    totalDepositedAmount: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide a email'],
        match: [
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
            'Please Provide a valid Email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a Password'],
        minlenght: 6,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    instagramAccount: {
        type: String,
        default: ''
    },
    facebookAccount: {
        type: String,
        default: ''
    },
    twitterAccount: {
        type: String,
        default: ''
    },
    tiktokAccount: {
        type: String,
        default: ''
    },
    threadsAccount: {
        type: String,
        default: ''
    },
    youtubeAccount: {
        type: String,
        default: ''
    },    
    telegramAccount: {
        type: String,
        default: ''
    },
    jobRejections: {
        type: Number,
        default: 0
    },
    rejectedJobs: [{
        taskId:{
            type: String
        },
        taskType: {
            type: String
        },
        date: {
            type: String
        }
    }],
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    referrals: {
        type: Array
    },
    referralLink: {
        type: String,
        default: ''
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
{timestamps: true}
);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        return next();
    };
  
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcryptjs.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function(){
    return jsonwebtoken.sign({ id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken
}

const UserModel =  mongoose.model('supergigUser', UserSchema);
export default UserModel