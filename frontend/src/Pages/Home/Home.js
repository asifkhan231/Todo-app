import React, { useState} from 'react';
import '../../App.css';
import InputField from '../../Components/Todo Form/TodoForm';
import TodoList from '../../Components/Todo list/TodoList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_Id')
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
          <InputField />
          <TodoList />
        </main>
      </div>
    </>
  );
}

export default Home;