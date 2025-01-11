import userService from "../services/userServices.js"


const login = async (req, res) => {
    const data = req.body
    if (!data.email || !data.password) {
        res.status(500).json({ message: "insert valid data" })
    }

    return userService.login(req, res)
}

const signup = async (req, res) => {
    console.log(req.body,'hi')
    return userService.signUp(req, res)
}

const getUsers = async (req, res) => {
    return userService.getUsers(req, res)
}

const getUserById = async (req, res) => {
    return userService.getUserById(req, res)
}
export default { login, signup, getUsers,getUserById }