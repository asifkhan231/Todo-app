import React, { useState, useEffect } from 'react';
import '../../App.css';
import InputField from '../../Components/Todo Form/TodoForm';
import TodoList from '../../Components/Todo list/TodoList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim()) {
      setTodos([...todos, { text: todo, completed: false }]);
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <>
      <div className='app-container'>
        <header className="app-header">
          <h1>Todo List</h1>
          <Button variant='contained' className='lg_btn' id='logout' onClick={handleLogOut}>Logout</Button>
        </header>
        <main className="app-main">
          <InputField addTodo={addTodo} />
          <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </main>
      </div>
    </>
  );
}

export default Home;