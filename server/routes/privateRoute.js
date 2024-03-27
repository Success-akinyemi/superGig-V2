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
privateRouter.route('/paystackWebhook').post(controller.paystackWebhook) //withdraw Earnings





/**GET ROUTES */
privateRouter.route('/getAllTask/:id').get(Protect, controller.getAllTask)
privateRouter.route('/getTask/:id/:taskId').get(Protect, controller.getSpecificTask)
privateRouter.route('/getAllTaskPostedByUser/:id').get(Protect, controller.getAllJobPostedByUser)
privateRouter.route('/getATaskPostedByUser/:userId/:jobId').get(Protect, controller.getSpecificJobPostedByUser)
privateRouter.route('/getUserAccountInfo/:id').get(Protect, controller.getAccountInfo) //get user bank info
privateRouter.route('/getPaymentOrder/:id').get(Protect, controller.getUserPaymentOrder) //get user payment order
privateRouter.route('/getTransactionData/:id').get(Protect, controller.getTransactionData) //get user transaction data
privateRouter.route('/getAllUserReferrees/:id').get(Protect, controller.getAllUserReferrees) //get all user referrees


export default privateRouter

