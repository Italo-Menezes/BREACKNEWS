import {Router} from 'express'
import userController from '../controllers/user.controler.js'
import {validId, validUser } from '../middlewares/global.middlewares.js'

const router = Router()

router.post('/', userController.create)
router.get('/', userController.findAll)
router.get('/:id', validId, validUser, userController.findbyid)
router.patch('/:id', validId, validUser, userController.update)

export default router;