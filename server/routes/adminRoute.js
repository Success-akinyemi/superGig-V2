import { Router } from 'express'
const privateRouter = Router()
import * as controller from '../controllers/adminRoutes.js'
import { AdminProtect, Protect } from '../middleware/auth.js';


privateRouter.route('/makeAdmin').post(Protect, AdminProtect, controller.makeAdmin); //make admin
privateRouter.route('/confirmPayment').post(Protect, AdminProtect, controller.confirmPayment); //cofirm payment order
privateRouter.route('/sendEmail').post(AdminProtect, controller.sendEmail); //send promotion email

//TASK
privateRouter.route('/newTaskCategory').post(Protect, AdminProtect, controller.createTaskCategory); //create new task category
privateRouter.route('/updateTaskCategory').post(Protect, AdminProtect, controller.updateTaskCategory); //update new task category
privateRouter.route('/newSocialMediaPlatform').post(Protect, AdminProtect, controller.createSocialmediaPlatform); //create new social media platform
privateRouter.route('/newSocialMediaTask').post(Protect, AdminProtect, controller.createSocialmediaTask); //create new social media task
privateRouter.route('/updateSocialMediaTask').post(Protect, AdminProtect, controller.updateSocialmediaTask); //update a social media task

privateRouter.route('/newMusicPlatform').post(Protect, AdminProtect, controller.createMusicPlatform); //create a music platform
privateRouter.route('/createMusicTask').post(Protect, AdminProtect, controller.createMusicTask); //create new music task

privateRouter.route('/newMobileApplicationPlatform').post(Protect, AdminProtect, controller.createMobileApplicationPlatform); //create a Mobile Application Platform
privateRouter.route('/createMobileApplicationTask').post(Protect, AdminProtect, controller.createMobileApplicationTask); //create new Mobile Application Task





privateRouter.route('/getAllUser').get(Protect, AdminProtect, controller.getAllUser)
privateRouter.route('/getAllPaymentOrder/:query').get(Protect, AdminProtect, controller.getAllPaymentOrder); //get all payment order
privateRouter.route('/getAPaymentOrder/:id').get(Protect, AdminProtect, controller.getAPaymentOrder); //get all payment order
privateRouter.route('/getAllTask/:id').get(Protect, AdminProtect, controller.getAllTask)
privateRouter.route('/getAllTaskForSocialMedia/:code').get(Protect, AdminProtect, controller.getAllTaskForASocialMedia)
privateRouter.route('/getAllTaskForSocialMedia/:code/:id').get(Protect, AdminProtect, controller.getAllTaskForASocialMedia)

privateRouter.route('/getAllTaskForMusic/:code').get(Protect, AdminProtect, controller.getAllTaskForAMusic)
privateRouter.route('/getAllTaskForMusic/:code/:id').get(Protect, AdminProtect, controller.getAllTaskForAMusic)

privateRouter.route('/getAllTaskForAMobileApplication/:code').get(Protect, AdminProtect, controller.getAllTaskForAMobileApplication)
privateRouter.route('/getAllTaskForAMobileApplication/:code/:id').get(Protect, AdminProtect, controller.getAllTaskForAMobileApplication)


//privateRouter.route('/getTask/:id/:taskId').get(Protect, controller.getSpecificTask)


//privateRouter.route('/getAllPaymentOrder/:query').get( controller.getAllPaymentOrder); //get all payment order
//privateRouter.route('/getAPaymentOrder/:id').get( controller.getAPaymentOrder); //get all payment order
//privateRouter.route('/getAllTask/:id').get( controller.getAllTask)
//privateRouter.route('/getTask/:id/:taskId').get( controller.getSpecificTask)


export default privateRouter