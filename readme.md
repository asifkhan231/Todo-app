# Todo App Project

This is a full-stack Todo application built using **Create React App** for the frontend and **Express.js** for the backend. The project allows users to manage tasks, with features like adding, marking as complete, and deleting tasks. The backend is connected to a SQL database for data persistence.

## Features

- Add new tasks.
- Mark tasks as completed or uncompleted.
- Delete tasks.
- Uses JWT for authentication.
- Responsive user interface with React.
- RESTful API built with Express.js.

---

## Frontend (React)

### Prerequisites

Ensure you have Node.js and npm installed.

### Setup and Commands

1. **Create React App Installation**:
   ```bash
   npx create-react-app frontend
   cd frontend
   ```

2. **Install Dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install 
   ```

3. **Available Scripts**:

   - **Start the development server**:
     ```bash
     npm start
     ```

   - **Build for production**:
     ```bash
     npm run build
     ```

   - **Test the application**:
     ```bash
     npm test
     ```

4. **Folder Structure**:
   - **src/**: Contains components, services, and utility files.
   - **public/**: Holds static files.

5. **Environment Variables**:
   Create a `.env` file in the root of the `frontend` directory to store environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```\
6. **LocalHost**:
   frontend will run on localhost:
   ```PORT
   http://localhost:3000
   ```\ 

---

## Backend (Express.js)

### Prerequisites

Ensure you have Node.js, npm, and a SQL database installed.

### Setup and Commands

1. **Initialize the Project**:
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install Dependencies**:
   ```bash
   npm install i
   ```

3. **Development Setup**:

   - **Start the development server**:
     ```bash
     node src/index.js
     ```

   - Use `nodemon` for live reloading during development:
     ```bash
     npm install -g nodemon
     nodemon src/index.js
     ```

4. **Folder Structure**:
   - **src/**: Contains configuration, routes, services, and middleware.
   - **.env**: Stores environment variables for database and JWT settings.

5. **Environment Variables**:
   Create a `.env` file in the root of the `backend` directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=todoDB
   DB_USER=root
   DB_PASSWORD=yourpassword
   PORT=8080
   JWT_SECRET=your_jwt_secret
   ```

6. **SQL Setup**:
   Use the following SQL command to create the `todos` table:
   ```sql
   CREATE TABLE todos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       task VARCHAR(255),
       isComplete BOOLEAN DEFAULT false,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

    Use the following SQL command to create the `users` table:
   ```sql
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
   ```

7. **API Endpoints**:

   - **POST /api/todos/add**: Add a new task.
   - **GET /api/todos/alltodos**: Fetch all tasks.
   - **PATCH /api/todos/update/:id**: Update task completion status.
   - **DELETE /api/todos/delete/:id**: Delete a task.

- **POST /api/users/signup**: Add a new task.
- **POST /api/users/login**: Add a new task.
---

## Running the Full Project

1. Start the backend server:
   ```bash
   cd backend
   node src/index.js
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:8080`.

---

## Additional Notes

- Make sure both frontend and backend servers are running.
- Ensure the database is set up and running properly.
- Use Postman to test backend APIs before integrating with the frontend.

Feel free to customize and expand this project according to your requirements!

