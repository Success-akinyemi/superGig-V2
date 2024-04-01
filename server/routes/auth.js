import { Router } from 'express'
import * as controller from '../controllers/auth.js'

const router = Router();


//POST ROUTES
router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/forgotPassword').post(controller.forgotPassword)
router.route('/:id/verify/:token').post(controller.verifyNewUser)
router.route('/updateUser').post(controller.updateUser)
router.route('/signout').post(controller.signout)




//GET ROUTES
router.route('/user/:id').get(controller.getUser)

//PUT ROUTES
router.route('/resetPassword/:resetToken').put(controller.resetPassword)





export default router