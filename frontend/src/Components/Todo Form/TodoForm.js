import React, { useActionState, useState } from 'react';
import './todoForm.css';
import { useTodoContext } from '../../Context/TodoContext';

const InputField = () => {
  const { setAlertMsg, addTodo, todos } = useTodoContext()
  const [todoState, setTodoState] = useState('All')

  const [todoInput, submitAction, isPanding] = useActionState(handleSubmit, { data: null, error: null })

  async function handleSubmit(preState, data) {
    let todoInp = data.get('todo')
    try {
      if (!todoInp) {
        throw new Error('Please fill all the fields')
      }
      addTodo(todoInp)

    } catch (error) {
      setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.message })
    }
  };

  const changleHandler = (e) => {
    setTodoState(e.target.value)

    const todoItems = document.querySelectorAll('.todo__item')
    todoItems.forEach((todo) => {
      switch (e.target.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'active':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    });
  }

  return (
    <div className='form__container'>
      <form className="todo__form" action={submitAction}>
        <input
          className="todo__input__box"
          type="text"
          name='todo'
          placeholder="Add a new todo"
          disabled={isPanding}
        />
        <button className="add__btn" type="submit">{isPanding ?' adding...':'add'}</button>
      </form>
      <div class="select">
        <select name="todoState" class="filter-todo" value={todoState} onChange={changleHandler} >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
};

export default InputField;