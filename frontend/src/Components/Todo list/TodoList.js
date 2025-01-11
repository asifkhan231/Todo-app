import React, { useState } from 'react';
import './todoList.css';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Button from '@mui/material/Button';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { useTodoContext } from '../../Context/TodoContext';
import EditTodoModal from '../Todo Item/TodoItem';

const TodoList = () => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const { todos, updateTodo, deleteTodo, setListData } = useTodoContext()

  const toggleComplete = (id, todo) => {
    try {
      let { task, isComplete } = todo
      isComplete = !isComplete
      updateTodo(id, { task, isComplete })
      setListData([...todos])
    } catch (error) {
      console.log(error)
    }
  };

  const handleOpen = () => setOpen(true)
  const handleEditModal = (id) => {
    const data = todos.find(todo => todo.id === id)
    setEditData(data)
    handleOpen()
  }
  const handleClose = () => setOpen(false)
  return (
    <>
      <EditTodoModal handleClose={handleClose} open={open} editData={editData} />
      <ul className="todo__list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo__item ${todo.isComplete ? 'completed' : ''}`}>
            <span>{todo.task}</span>
            <div>
              <Button variant="standard" className='edit__button' onClick={() => handleEditModal(todo.id)}><ModeEditOutlineOutlinedIcon /></Button>
              <Button variant="standard" className="complete__button" onClick={() => toggleComplete(todo.id, todo)}><DoneSharpIcon /></Button>
              <Button variant="standard" className="delete__button" onClick={() => deleteTodo(todo.id)}><DeleteOutlineOutlined /></Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
