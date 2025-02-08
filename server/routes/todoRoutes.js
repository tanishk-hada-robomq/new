import express from 'express'
import todoControllersModel from '../controllers/todoControllers.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.get('/', authenticate, todoControllersModel.getTodos)
router.post('/add', authenticate, todoControllersModel.addTodo)
router.put('/:id', authenticate, todoControllersModel.updateTodo)
router.delete('/:id', authenticate, todoControllersModel.deleteTodo)

export default router 