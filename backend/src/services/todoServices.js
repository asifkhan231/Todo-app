import newConnection from "../config/dbConnection.js";


const db = await newConnection();
const addTodo = async (req, res) => {
    try {
        const { userId,todo } = req.body;
        const addQuery = `INSERT INTO Todos (userId,task) VALUES (?,?)`
        const [result] = await db.execute(addQuery, [userId,todo])
        res.status(201).json({ message: 'Todo added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

const getAllTodos = async (req, res) => {
    try {
        const {userId} = req.query
        const getQuery = `SELECT * FROM Todos   WHERE userId = ?`
        const [result] = await db.execute(getQuery,[userId])
        res.status(200).json({ todoList: result, message: 'Todo list fetched successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

const updateTodo = async (req, res) => {
    console.log(req.body)
    try {
        const id = req.params.id;
        const { task, isComplete } = req.body;
        const updateQuery = `UPDATE Todos SET task = ?, isComplete = ? WHERE id = ?`
        const [result] = await db.execute(updateQuery, [task, isComplete, id])
        res.status(201).json({ message: 'Todo has updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM todos WHERE id = ?`
        const [result] = await db.execute(deleteQuery, [id])
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "todo not found" })
        }

        res.status(200).json({ message: "todo has deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', error: error.message });
    }
}

const getTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const getQuery = `SELECT * FROM Todos WHERE id = ?`
        const [result] = await db.execute(getQuery, [id])
        if (result.length === 0) {
            res.status(404).json({ message: "Todo not found" })
        }
        res.status(200).json({ todo: result[0], message: 'Todo fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export default { addTodo, getAllTodos, updateTodo, deleteTodo, getTodoById };