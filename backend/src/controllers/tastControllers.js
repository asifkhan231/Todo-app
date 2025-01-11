import todoServices from "../services/todoServices.js"

const addTodo = async (req, res) => {
    return await todoServices.addTodo(req, res);
}

const getAllTodos = async (req, res) => {
    return await todoServices.getAllTodos(req, res);
}

const updateTodo = async (req, res) => {
    return await todoServices.updateTodo(req, res);
}

const deleteTodo = async (req, res) => {
    return await todoServices.deleteTodo(req, res);
}

const getTodoById = async (req, res) => {
    return await todoServices.getTodoById(req, res);
}
export default { addTodo, getAllTodos, updateTodo, deleteTodo,getTodoById };