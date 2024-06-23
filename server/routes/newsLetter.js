import { Router } from 'express'
const router = Router()
import * as controller from '../controllers/newsLetter.js'
import { AdminProtect, Protect } from '../middleware/auth.js';


router.route('/joinNewsLetter').post(controller.joinNewsLetter)
router.route('/unsubscribe/:id').post(controller.removeNewsletter)


export default router