import { Router } from "express";
import tastControllers from "../controllers/tastControllers.js";

const todoRoutes = Router();

todoRoutes.post('/add',tastControllers.addTodo)

todoRoutes.get('/alltodos',tastControllers.getAllTodos)

todoRoutes.put('/update/:id',tastControllers.updateTodo)

todoRoutes.delete('/delete/:id',tastControllers.deleteTodo)

todoRoutes.get('/get-todo/:id',tastControllers.getTodoById)

export default todoRoutes;