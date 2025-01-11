import "dotenv/config";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helemt from 'helmet';
import todoRoutes from './src/routes/todoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import auth from "./src/middleware/auth.js";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helemt())

app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is ready');
})

app.use('/todos', auth, todoRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})