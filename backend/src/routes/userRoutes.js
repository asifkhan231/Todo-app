import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouters = Router()

userRouters.post('/login', userController.login)
userRouters.post('/sign-up', userController.signup)
userRouters.get('/get-user/:id',auth,userController.getUserById)
userRouters.get('/get-users', auth,userController.getUsers)

export default userRouters