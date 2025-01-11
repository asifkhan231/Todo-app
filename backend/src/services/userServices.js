import newConnection from "../config/dbConnection.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const db = await newConnection()
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const query = `SELECT * FROM users WHERE email = ?`
        const [user] = await db.execute(query, [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: "user not exists" });
        }

        const foundUser = user[0];

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const payload = {
            userId: foundUser.id,
            username: foundUser.username,
            email: foundUser.email
        };
console.log(process.env.JWT_SECRET_KEY)
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRE_IN });

        res.status(200).json({ message: "Login successful", token, userId: foundUser.id });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
}

const signUp = async (req, res) => {
    console.log(req.body)
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userFindQuery = `SELECT * FROM users WHERE email = ?`
        const [user] = await db.execute(userFindQuery, [email]);
        if (user.length > 0) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        const [result] = await db.execute(insertQuery, [username, email, hashedPassword]);

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
        });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Error during signup", error: error.message });
        }
    }
}

const getUsers = async (req, res) => {
    try {
        const query = `SELECT * FROM users`;
        const [result] = await db.execute(query);

        if (result.length === 0) {
            return res.status(200).json({ message: "Users are not available" });
        }

        return res.status(200).json({ result });
    } catch (error) {
        if (!res.headersSent) {
            // Send an error response if headers are not sent yet
            return res.status(500).json({ message: "Error fetching users", error: error.message });
        }
        console.error("Error after headers were sent:", error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const query = `SELECT * FROM users WHERE id= ?`;
        const [result] = await db.execute(query,[id]);

        if (result.length === 0) {
            return res.status(200).json({ message: "Users are not available" });
        }

        return res.status(200).json({ result });
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ message: "Error fetching users", error: error.message });
        }
        console.error("Error after headers were sent:", error.message);
    }
}

export default { login, signUp, getUsers, getUserById }