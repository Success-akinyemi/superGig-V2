import { Router } from 'express'
const privateRouter = Router()
import * as controller from '../controllers/privateRoute.js'
import { Protect } from '../middleware/auth.js';


privateRouter.route('/createTask').post(Protect, controller.createTask);
privateRouter.route('/addSocialMediaAccount').post(Protect, controller.addUserSocialMedia)
privateRouter.route('/submitTask').post(Protect, controller.submitTask)
privateRouter.route('/updateAccountInfo').post(Protect, controller.updateBankInfo) //Update user bank account info
privateRouter.route('/withdrawBonusEarning').post(Protect, controller.withdrawBonusEarning) //withdraw Bonus Earning
privateRouter.route('/withdrawEarnings').post(Protect, controller.withdrawEarnings) //withdraw Earnings

privateRouter.route('/payWithPaystack').post(Protect, controller.payWithPaystack) //withdraw Earnings
privateRouter.route('/paystackWebhook').post(controller.paystackWebhook) //paystack webhook
privateRouter.route('/paystackVerifyFunding').post(controller.paystackVerifyFunding) //withdraw Earnings



/**GET ROUTES */
privateRouter.route('/getAllTask/:id').get(Protect, controller.getAllTask)
privateRouter.route('/getAllTaskCompletedByUser/:id').get(Protect, controller.getAllTaskCompletedByUser) //get all task completed by user
privateRouter.route('/getTask/:id/:taskId').get(Protect, controller.getSpecificTask)
privateRouter.route('/getAllTaskPostedByUser/:id').get(Protect, controller.getAllJobPostedByUser)
privateRouter.route('/getATaskPostedByUser/:userId/:jobId').get(Protect, controller.getSpecificJobPostedByUser)
privateRouter.route('/getUserAccountInfo/:id').get(Protect, controller.getAccountInfo) //get user bank info
privateRouter.route('/getPaymentOrder/:id').get(Protect, controller.getUserPaymentOrder) //get user payment order
privateRouter.route('/getTransactionData/:id').get(Protect, controller.getTransactionData) //get user transaction data
privateRouter.route('/getAllUserReferrees/:id').get(Protect, controller.getAllUserReferrees) //get all user referrees

privateRouter.route('/getAllTaskCategory').get(Protect, controller.getAllTaskCategory)// get all task category (for creating new task by users)
privateRouter.route('/getAllSocialMediaCategory').get(Protect, controller.getAllSocialMediaCategory)// get all social media category (for creating new task by users)
privateRouter.route('/getAllSocialMediaTask').get(Protect, controller.getAllSocialMediaTask)// get all social media task (for creating new task by users)



export default privateRouter

