import { Router } from 'express'
const privateRouter = Router()
import * as controller from '../controllers/adminRoutes.js'
import { AdminProtect, Protect } from '../middleware/auth.js';


privateRouter.route('/makeAdmin').post(Protect, AdminProtect, controller.makeAdmin); //make admin
privateRouter.route('/confirmPayment').post(Protect, AdminProtect, controller.confirmPayment); //cofirm payment order
privateRouter.route('/sendEmail').post(controller.sendEmail); //send promotion email

//TASK
privateRouter.route('/newTaskCategory').post(Protect, controller.createTaskCategory); //create new task category
privateRouter.route('/newSocialMediaPlatform').post(Protect, controller.createSocialmediaPlatform); //create new social media platform
privateRouter.route('/newSocialMediaTask').post(Protect, controller.createSocialmediaTask); //create new social medi task
privateRouter.route('/updateSocialMediaTask').post(Protect, controller.updateSocialmediaTask); //update a social medi task






privateRouter.route('/getAllPaymentOrder/:query').get(Protect, AdminProtect, controller.getAllPaymentOrder); //get all payment order
privateRouter.route('/getAPaymentOrder/:id').get(Protect, AdminProtect, controller.getAPaymentOrder); //get all payment order
privateRouter.route('/getAllTask/:id').get(Protect, controller.getAllTask)
privateRouter.route('/getAllTaskForSocialMedia/:code').get(Protect, controller.getAllTaskForASocialMedia)
privateRouter.route('/getAllTaskForSocialMedia/:code/:id').get(Protect, controller.getAllTaskForASocialMedia)
//privateRouter.route('/getTask/:id/:taskId').get(Protect, controller.getSpecificTask)


//privateRouter.route('/getAllPaymentOrder/:query').get( controller.getAllPaymentOrder); //get all payment order
//privateRouter.route('/getAPaymentOrder/:id').get( controller.getAPaymentOrder); //get all payment order
//privateRouter.route('/getAllTask/:id').get( controller.getAllTask)
//privateRouter.route('/getTask/:id/:taskId').get( controller.getSpecificTask)


export default privateRouter