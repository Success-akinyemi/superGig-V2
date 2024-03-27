import BankAccountDetailModel from "../models/BankAccountDetail.js"
import FacebookModel from "../models/FaceBook.js"
import InstagramModel from "../models/Instagram.js"
import MasterIncomeModel from "../models/MasterIncome.js"
import PaymentOrderModel from "../models/PaymentOrder.js"
import TaskModel from "../models/Task.js"
import TelegramModel from "../models/Telegram.js"
import ThreadsModel from "../models/Threads.js"
import TiktokModel from "../models/Tiktok.js"
import TransactionModel from "../models/Transactions.js"
import TwitterModel from "../models/Twitter.js"
import UserModel from "../models/User.js"
import YoutubeModel from "../models/Youtube.js"
import { updateUser } from "./auth.js"
import axios from 'axios'
import { registerMail } from "./mailer.js"

/**Add social media account */
export async function addUserSocialMedia(req, res){
    const {accountValue, platformCode, userId} = req.body

    try {
        const isUser =  await UserModel.findById({ _id: userId })
        if(!isUser){
            res.status(404).json({ success: false, data: 'User does not exist' })
        }
        if(platformCode === '01'){
            const accountExist = await InstagramModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${InstagramModel.name} Account alredy exist`})
            }
            const createAccount =  await InstagramModel.create({ accountValue, userId})
            isUser.instagramAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${InstagramModel.name} account created successfully`})
        }

        if(platformCode === '02'){
            const accountExist = await FacebookModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${FacebookModel.name} Account alredy exist`})
            }
            const createAccount =  await FacebookModel.create({ accountValue, userId})
            isUser.facebookAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${FacebookModel.name} account created successfully`})
        }

        if(platformCode === '03'){
            const accountExist = await TwitterModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${TwitterModel.name} Account alredy exist`})
            }
            const createAccount =  await TwitterModel.create({ accountValue, userId})
            isUser.twitterAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${TwitterModel.name} account created successfully`})
        }

        if(platformCode === '04'){
            const accountExist = await ThreadsModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${ThreadsModel.name} Account alredy exist`})
            }
            const createAccount =  await ThreadsModel.create({ accountValue, userId})
            isUser.threadsAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${ThreadsModel.name} account created successfully`})
        }

        if(platformCode === '05'){
            const accountExist = await TiktokModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${TiktokModel.name} Account alredy exist`})
            }
            const createAccount =  await TiktokModel.create({ accountValue, userId})
            isUser.tiktokAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${TiktokModel.name} account created successfully`})
        }

        if(platformCode === '06'){
            const accountExist = await YoutubeModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${YoutubeModel.name} Account alredy exist`})
            }
            const createAccount =  await YoutubeModel.create({ accountValue, userId})
            isUser.tiktokAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${YoutubeModel.name} account created successfully`})
        }

        if(platformCode === '07'){
            const accountExist = await TelegramModel.findOne({ accountValue })
            if(accountExist){
                return res.status(400).json({ success: false, data: `${TelegramModel.name} Account alredy exist`})
            }
            const createAccount =  await TelegramModel.create({ accountValue, userId})
            isUser.tiktokAccount = accountValue
            await isUser.save()
            return res.status(201).json({ success: true, data: `${TelegramModel.name} account created successfully`})
        }

    } catch (error) {
        console.log('ERROR CREATING USER ACCOUNT', error)
        res.status(500).json({ success: false, data: 'Failed to create account'})
    }
    
}

/**FUNDING */
export async function payWithPaystack(req, res){
    const { email, amount } = req.body
    try {
        console.log(email, amount)
        const fullAmount = amount * 100

        const response = await axios.post(
          `${process.env.PAYSTACK_INITIALIZE_URL}`,
          {
            email,
            amount: fullAmount,
            callback_url: `${process.env.CALLBACK_URL}`
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(response.data);
        const { authorization_url, reference } = response.data.data;
        //res.redirect(response.data.data.authorization_url); // Redirect user to their dashboard
        console.log('refrence',reference)
        
        res.send({ authorizationUrl: authorization_url });

    } catch (error) {
        console.log('UNABLE TO MAKE FUNDING', error)
        res.status(500).json({ success: false, data: 'Unable to Make Funding'})
    }
}

 export async function paystackWebhook(req, res){
     const { event, data } = req.body;
   
     if (event === 'charge.success') {
       const metadata = data;
       const email = data.customer.email
       const amount = data.amount;
       const refrence = data.reference || ''
       const statusMsg = data.status || ''
       const response = data.gateway_response || ''
       
       const value = amount / 100
       console.log('Amount>>',amount/100, '>>EMAIL>>',email)
       console.log('Meta data>>',metadata)
        const user = await UserModel.findOne({ email: email})
       if(statusMsg === 'success'){
         const RiskAmount = ( 15 * value) / 100
         console.log('RISK AMOUNT', RiskAmount)
         const totalAmount = RiskAmount + value
         user.fundWallet += totalAmount
         user.totalDepositedAmount += value
         if(user.referredBy){
            console.log('REF ID',user.referredBy)
             const referrer = await UserModel.findById({ _id: user.referredBy })
             if(referrer){
                 const referrerBonus = ( 10 * value) / 100
                 referrer.totalReferralEarnings += referrerBonus
                 await referrer.save()
             } else {
                 console.log('REFERRER NOT FOUND')
             }
         }
         await user.save()
         const transaction = await TransactionModel.create({
             action: 'Funding',
             amount: value,
             userId: user._id,
             fundSource: 'Paystack',
             transactionId: refrence,
             credit: true
         })
         const income = await MasterIncomeModel()
         income.totalIncome += value
         await income.save()
 
         console.log('INCOME', income)        
       } else {
         console.log('NOT SUCCESS>>>', statusMsg)
       }
       
   
       console.log('Successful transaction:');
     } else if (event === 'charge.failed') {
       console.log('Transaction Failure');
     }
   
     res.end()
   }

/**TASK APIs */
//create job
export async function createTask(req, res){
    const {platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy} = req.body

    try {
        if(!platform || !platformCode || !task || !unitPrice || !pricePerFreelancer || !taskUrl || !numberOfWorkers || !createdBy) {
            return res.status(400).json({ success: false, data: 'All Field are required'})
        }
        const user = await UserModel.findById({ _id: createdBy })
        const amount = unitPrice * numberOfWorkers
        if(!user){
            return res.status(404).json({ success: false, data: 'User does not exist'})
        }
        if(user.fundWallet < amount){
            return res.status(401).json({ success: false, data: 'Insuicient funds to create task'})
        }

        const newTask = await TaskModel.create({
            task, platform, platformCode, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy
        })

        user.fundWallet -= amount
        await user.save()

        const transactionData = {
            action: 'Job order',
            amount,
            userId: createdBy,
            fundSource: 'Wallet',
            transactionId: Date.now(),
            credit: false
        }

        const transaction = await TransactionModel.create(transactionData)

        //temporary send email to admin for each job created
            await registerMail({
                username: 'Hi success',
                userEmail: 'supergig50@gmail.com',
                subject: 'New job Created',
                intro: `job created by: ${user.username}`,
                instructions: 'Vist site to see more',
                outro: `
                    price: ${amount}, platForm: ${platform}, Workers needed: ${numberOfWorkers}, Task: ${task}
                `,
                verifyUrl: 'https://supergig.onrender.com',
                text: 'View Job',
            });


        res.status(201).json({ success: true, data: 'Task Created Successfuly'})
    } catch (error) {
        console.log('ERROR CREATING TASK', error)
        res.status(500).json({ success: false, data: 'Unable to create Task' })
    }
}

// get all job
export async function getAllTask(req, res){
    const { id } = req.params
    console.log('ID', id)
    try {
        const allTask = await TaskModel.find()
        const user = await UserModel.findById({ _id: id })
        if(!user){
            return res.status(404).json({ success: false, data: 'Invalid User'})
        }
        if(!allTask){
            return res.status(404).json({ success: false, data: 'No Available Task at the moment please check later'})
        }


        const filteredTask = allTask.filter((task) => {
            // Check if user is not the creator
            if (task.createdBy.toString() === id.toString()) {
              return false;
            }
      
            // Check if there are open positions
            if (task.numberOfWorkers === task.completedRate) {
              return false;
            }
      
            // Check if user is not in approved or rejected workers
            return !(task.approvedWorkers.some(worker => worker.freelancerId === id) ||
                     task.rejectedWorkers.some(worker => worker.freelancerId === id));
          });

        res.status(200).json({ success: true, data: filteredTask})
    } catch (error) {
        console.log('COULD NOT GET ALL TASK', error)
        res.status(500).json({ success: false, data: 'Could not get all available Task'})
    }
}

//get specific job
export async function getSpecificTask(req, res){
    const { id, taskId } = req.params

    try {
        const user = await UserModel.findById({ _id: id })
        if(!user){
            return res.status(404).json({ success: false, data: 'Invalid User'})
        }

        const task = await TaskModel.findById({ _id: taskId })
        if(!task){
            return res.status(404).json({ success: false, data: 'No task found'})
        }

        if(task.numberOfWorkers === task.completedRate){
            return res.status(404).json({ success: false, data: 'This task has been completed'})
        }

        if(task.approvedWorkers.includes(id)){
            return res.status(401).json({ success: false, data: 'User has completed this task'})
        }

        res.status(200).json({ success: true, data: task })
    } catch (error) {
        console.log('ERROR GETTING SPECIFIC TASK', error)
        res.status(500).json({ success: false, data: 'Could not get the task'})
    }
}

//perform job and get paid
export async function submitTask(req, res){
    const { userProfile, taskId, userId, proofImg } = req.body
    try {
        const user = await UserModel.findById({ _id: userId})
        const task = await TaskModel.findById({_id: taskId})
        if(!user){
            return res.status(404).json({ success: false, data: 'Invalid User'})
        }
        if(!task){
            return res.status(404).json({ success: false, data: 'No task found'})
        }
        const userExist = task.approvedWorkers.findIndex(worker => worker.freelancerId === userId) !== -1 ||
                            task.rejectedWorkers.findIndex(worker => worker.freelancerId === userId) !== -1
        if(userExist){
            return res.status(404).json({ success: false, data: 'User has done this task'})
        }
        if(task.numberOfWorkers === task.completedRate){
            return res.status(404).json({ success: false, data: 'This task has been completed'})
        }

        const approveWorkerArray = {
            freelancerName: user.username,
            freelancerId: user._id,
            freelancerUrl: userProfile,
            imageProof: proofImg
        }

        task.completedRate += 1
        task.approvedWorkers.push(approveWorkerArray)

        await task.save()

        user.earningWallet += task.pricePerFreelancer
        user.completedTask += 1
        await user.save()

        const transactionData = {
            action: 'Earning',
            amount: task.pricePerFreelancer,
            userId,
            fundSource: 'Task Point',
            transactionId: Date.now(),
            credit: true
        }
        const transaction = await TransactionModel.create(transactionData)
        res.status(201).json({ success: true, data: 'Job done. All jobs will be checked before payout'})
    } catch (error) {
        console.log('UNABLE TO PERFORM JOB COMPLETED ACTION', error)
        res.status(500).json({ success: false, data: 'An error occured'})
    } 
}

//get all jobs posted by a user
export async function getAllJobPostedByUser(req, res){
    const { id } = req.params

    try {
        const jobPostings = await TaskModel.find({ createdBy: id })
    
        res.status(200).json({ success: true, data: jobPostings })
    } catch (error) {
        console.log('COULD NOT GET JOB POSTED BY USER', error)
        res.status(500).json({ success: false, data: 'Could not get job posted by user'})
    }
}

//get specific job posted by a user
export async function getSpecificJobPostedByUser(req, res){
    const { jobId, userId } = req.params
    console.log('working')
    console.log('JOB_ID', jobId)
    console.log('USER_ID', userId)

    try {
        const job = await TaskModel.findById({ _id: jobId })
        const user = await UserModel.findById({ _id: userId })
        if(!job){
            res.status(401).json({ success: false, data: 'job not found'})
        }
        if(job.createdBy === user._id){
            return res.status(404).json({ success: false, data: 'Not allowed' })
        }

        res.status(200).json({ success: true, data: job })
    } catch (error) {
        console.log('ERROR GETTING SPECIFIC TASK', error)
        res.status(500).json({ success: false, data: 'Could not get job'})
    }
}

//Update user bank info
export async function updateBankInfo(req, res){
    const { accountName, getBankName, userId, accountNumber } = req.body
    
    try {
        const user = await UserModel.findById(userId);
        
        if (!userId || !accountName || !getBankName || !accountNumber || !user) {
            return res.status(404).json({ success: false, data: 'Invalid input' });
        }
        console.log('BEFOR', accountNumber)
        let bankAccountDetail = await BankAccountDetailModel.findOne({ userId: userId });
        
        if (!bankAccountDetail) {
            // Create new bank account detail
            bankAccountDetail = await BankAccountDetailModel.create({
                accountName,
                bankName: getBankName,
                userId,
                accountNumber
            });
        } else {
            // Update existing bank account detail
            bankAccountDetail.accountName = accountName;
            bankAccountDetail.bankName = getBankName;
            bankAccountDetail.accountNumber = accountNumber
            await bankAccountDetail.save();
        }
        console.log('AFTER', bankAccountDetail)
        return res.status(201).json({ success: true, data: 'Bank Account Information Updated' });
    } catch (error) {
        console.log('ERROR UPDATING BANK INFORMATION:', error);
        return res.status(500).json({ success: false, data: 'Could not update bank information' });
    }
}

//get user bank account info
export async function getAccountInfo(req, res){
    const { id } = req.params
    
    try {
        const userAccountInfo = await BankAccountDetailModel.findOne({ userId: id })
        if(!userAccountInfo){
            return res.status(404).json({ success: false, data: 'Update Bank Info'})
        }
        if (typeof userAccountInfo.accountNumber === 'number') {
            const accountNumberString = String(userAccountInfo.accountNumber);
            userAccountInfo.accountNumber = accountNumberString.substring(1);
        }
        res.status(200).json({ success: true, data: userAccountInfo })
    } catch (error) {
        console.log('FAILED TO GET ACCOUNT INFO', error)
        res.status(500).json({ success: false, data: 'Could not account information'})
    }
}

//withdraw user referral bonus
export async function withdrawBonusEarning(req, res){
    let {bonusAmount, userId} = req.body

    bonusAmount = Number(bonusAmount);

    if (isNaN(bonusAmount)) {
        return res.status(400).json({ success: false, data: 'Invalid bonusAmount' });
    }

    try {
        const user = await UserModel.findById({ _id: userId })
        if(!user){
            return res.status(400).json({ success: false, data: 'Invalid User'})
        }
        if(user.totalReferralEarnings < bonusAmount ){
            return res.status(400).json({ success: false, data: 'Insufficient Bonus Fund'})
        }
        if(bonusAmount < 500){
            return res.status(400).json({ success: false, data: 'Minimium amount is 500'})
        }

        user.earningWallet += bonusAmount
        user.totalReferralEarnings -= bonusAmount
        await user.save()

        const transaction = await TransactionModel.create({
            action: 'Withdrawal',
            amount: bonusAmount,
            userId: user._id,
            fundSource: 'Referral bonus',
            transactionId: Date.now(),
            credit: false
        })
        
        res.status(200).json({success: true, data: 'Bonus withdrawn successful'})
    } catch (error) {
        console.log('COULD NOT WITHDRAW BONUS EARRNING', error)
        res.status(500).json({ success: false, data: 'Could not withdraw bonus earnings'})
    }
}

//withdraw user earnings
export async function withdrawEarnings(req, res){
    let {earningAmount, userId} = req.body
    //console.log(earningAmount, userId)

    earningAmount = Number(earningAmount);

    if (isNaN(earningAmount)) {
        return res.status(400).json({ success: false, data: 'Invalid earning Amount' });
    }
    try {
        const user = await UserModel.findById({ _id: userId })
        const userBankAccountDetails = await BankAccountDetailModel.findOne({ userId: userId })
        const fee = (3 * earningAmount) / 100
        const totalAmount = Math.round(fee + earningAmount)
        if(!userBankAccountDetails){
            return res.status(400).json({ success: false, data: 'Please Add your account Details' })
        }
        if(user.earningWallet < totalAmount){
            return res.status(400).json({ success: false, data: 'Insuficient Wallent Balance'})
        }

        if(totalAmount < 500){
            return res.status(400).json({ success: false, data: 'Minimium Withdrawal amount is 500'})
        }

        user.earningWallet -= totalAmount
        await user.save()

        const transaction = await TransactionModel.create({
            action: 'Withdrawal',
            amount: earningAmount,
            userId: user._id,
            fundSource: 'Wallet Earnings',
            transactionId: Date.now(),
            credit: false
        })

        const paymentOrder = await PaymentOrderModel.create({
            userId: userId,
            bankName: userBankAccountDetails.bankName,
            accountName: userBankAccountDetails.accountName,
            accountNumber: userBankAccountDetails.accountNumber,
            amount: earningAmount
        })

        const expense = await MasterIncomeModel()
        expense.totalExpense += earningAmount
        await expense.save()

        console.log('Expense CREATED', expense)

                //temporary send email to admin for each payment order created
                await registerMail({
                    username: 'Hi success',
                    userEmail: 'supergig50@gmail.com',
                    subject: 'New payment order Created',
                    intro: `payment order created by: ${user.username}`,
                    instructions: 'Vist site to see more',
                    outro: `
                        Amount Requested: ${earningAmount}, account Name: ${userBankAccountDetails.bankName}, Account Number: ${userBankAccountDetails.accountNumber}, Account Name: ${userBankAccountDetails.accountName}
                    `,
                    verifyUrl: 'https://supergig.onrender.com',
                    text: 'View Job',
                });

        res.status(201).json({success: true, data: 'Withdrawal successfull, payments will be made shortly.'})
    } catch (error) {
        console.log('COULD NOT PROCESS EARNING WITHDRAWAL', error)
        res.status(500).json({ success: false, data: 'Could not process earning withdrawal'})
    }
}

//get user payment order
export async function getUserPaymentOrder(req, res){
    const { id } = req.params
    console.log('Id', id)
    try {
        const paymentOrder = await PaymentOrderModel.find({ userId: id })

        res.status(200).json({ success: true, data: paymentOrder })
    } catch (error) {
        console.log('COULD NOT GET USER PAYMENT ORDER', error)
        res.status(500).json({ success: false, data: 'could not get user Payment order'})
    }
}

export async function getTransactionData(req, res){
    const { id } = req.params
    console.log('Idm', id)
    try {
        const transactionData = await TransactionModel.find({ userId: id })

        res.status(200).json({ success: true, data: transactionData })
    } catch (error) {
        console.log('COULD NOT GET USER TRANSACTION DATA', error)
        res.status(500).json({ success: false, data: 'could not get user Payment order'})
    }
}

export async function getAllUserReferrees(req, res){
    const { id } = req.params
    console.log('Working')
    try {
        const user = await UserModel.findById({ _id : id })

        const referrees = user.referrals
        console.log('first', referrees)

        const referredUsers = [];

        for(const reerreeId of referrees){
            const referree = await UserModel.findById({ _id: reerreeId })

            if(referree){
                referredUsers.push({
                    _id: referree._id,
                    username: referree.username,
                    email: referree.email,
                    verified: referree.verified,
                    totalDepositedAmount: referree.totalDepositedAmount 
                })
            }
        }

        console.log('referredUsers', referredUsers)
        res.status(200).json({ success: true, data: referredUsers})

    } catch (error) {
        console.log('COULD NOT GET ALL REFERRED USERS')
        res.status(500).json({ success: false, data: 'Could not get reerred Users'})
    }
}

//api to update job rejected by user flag freelancer