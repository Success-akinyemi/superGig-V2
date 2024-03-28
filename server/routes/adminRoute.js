import { Router } from 'express'
const privateRouter = Router()
import * as controller from '../controllers/adminRoutes.js'
import { AdminProtect, Protect } from '../middleware/auth.js';


privateRouter.route('/makeAdmin').post(Protect, AdminProtect, controller.makeAdmin); //make admin
privateRouter.route('/confirmPayment').post(Protect, AdminProtect, controller.confirmPayment); //cofirm payment order
privateRouter.route('/sendEmail').post(controller.sendEmail); //send promotion email
//TASK
privateRouter.route('/newTaskCategory').post(controller.createTaskCategory); //create new task category
privateRouter.route('/newSocialMediaPlatform').post(controller.createSocialmediaPlatform); //create new social media platform
privateRouter.route('/newSocialMediaTask').post(controller.createSocialmediaTask); //create new social medi task
privateRouter.route('/updateSocialMediaTask').post(controller.updateSocialmediaTask); //update a social medi task






privateRouter.route('/getAllPaymentOrder/:query').get(Protect, AdminProtect, controller.getAllPaymentOrder); //get all payment order
privateRouter.route('/getAPaymentOrder/:id').get(Protect, AdminProtect, controller.getAPaymentOrder); //get all payment order
privateRouter.route('/getAllTask/:id').get(Protect, controller.getAllTask)
//privateRouter.route('/getTask/:id/:taskId').get(Protect, controller.getSpecificTask)


export default privateRouter