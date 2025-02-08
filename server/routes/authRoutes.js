import express from 'express'
import authControllersModel from '../controllers/authControllers.js'

const router = express.Router()

router.post('/validate-token', authControllersModel.validateToken)
router.post('/login', authControllersModel.login)
router.post('/register', authControllersModel.register)
router.get('/logout', authControllersModel.logout)

export default router 