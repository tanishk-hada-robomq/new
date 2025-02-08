import todoModel from '../models/todo.model.js'

const addTodo = async (req, res) => {
    try {
        const {title, description} = req.body
        await todoModel.createTodo(req.user.userId, title, description)
        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Error in creating todo'})        
    }
}

const getTodos = async (req, res) => {
    try {
        const [result] = await todoModel.getTodosByUserId(req.user.userId)
        return res.status(200).json({success: true, result})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Error getting todos'})
    }
}

const updateTodo = async (req, res) => {
    try {
        const {id, title, description} = req.body
        await todoModel.updateTodo(id, title, description)
        return res.status(200).json({success: true, message: 'Todo updated'})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Error updating todo'})        
    }
}

const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        await todoModel.deleteTodo(id)
        return res.status(200).json({success: true, message: 'todo deleted'})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Error deleting todo'})        
    }
}

const todoControllersModel = {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo
}

export default todoControllersModel