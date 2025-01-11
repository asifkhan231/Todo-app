import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { set } from 'react-hook-form'
import isTokenExpired from '../Components/IsTokenExpired'

const todoContext = createContext()

function TodoContext({ children }) {
    const [todos, setTodos] = useState([])
    const [listData, setListData] = useState([])
    const [alertMsg, setAlertMsg] = useState({
        snackbarOpen: false,
        alertSeverity: 'success',
        alertMessage: ''
    })

    const userUrl = 'http://localhost:3030/users'
    const todoUrl = 'http://localhost:3030/todos'

    const token = localStorage.getItem('access_token')
    const user_Id = localStorage.getItem('user_Id')

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_Id')
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: 'Session expired. Please log in again.' });
            window.location.href = '/login'; 
        }
    },[token])

    const handleSnackbarClose = () => {
        setAlertMsg(pre => ({ ...pre, snackbarOpen: false }))
    };

    const handleSignUp = async (data) => {
        try {
            const response = await axios.post(`${userUrl}/sign-up`, data)
            if (response.status === 201) {
                setAlertMsg({ snackbarOpen: true, alertSeverity: 'success', alertMessage: response.data.message })
            } else {
                throw new Error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response.data.message })
        }
    }

    const handleLogin = async (data) => {
        try {
            const response = await axios.post(`${userUrl}/login`, data)
            if (response.status === 200) {
                const {token,userId,message} = response.data
                let saveToken = localStorage.setItem('access_token', token)
                let saveUserId = localStorage.setItem('user_Id',userId)
                setAlertMsg({ snackbarOpen: true, alertSeverity: 'success', alertMessage: message })
                if (saveToken && saveUserId) {
                    await getAllTodos()
                }
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response.data.message })
        }
    }

    const addTodo = async (data) => {
        let userId = user_Id
        try {
            const response = await axios.post(`${todoUrl}/add`, { userId, todo: data }, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                setTodos([...todos, { text: data, completed: false }])
                setAlertMsg({ snackbarOpen: true, alertSeverity: 'success', alertMessage: response.data.message })
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response?.data.message })
        }
    }

    const getAllTodos = async () => {
        try {
            const response = await axios.get(`${todoUrl}/alltodos?userId=${user_Id}`, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setTodos(response.data.todoList)
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response.data.message })
        }
    }

    useEffect(() => {
        if (token) {
            getAllTodos()
        }
    }, [token, listData, todos])


    const updateTodo = async (id, data) => {

        try {
            const response = await axios.put(`${todoUrl}/update/${id}`, data, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                setAlertMsg({ snackbarOpen: true, alertSeverity: 'success', alertMessage: response.data.message })
                setListData([...todos])
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response.data.message })
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`${todoUrl}/delete/${id}`, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setTodos(todos.filter(todo => todo.id !== id))
                setAlertMsg({ snackbarOpen: true, alertSeverity: 'success', alertMessage: response.data.message })
                getAllTodos()
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setAlertMsg({ snackbarOpen: true, alertSeverity: 'error', alertMessage: error.response.data.message })
        }
    }


    return (
        <todoContext.Provider value={{ alertMsg, setAlertMsg, handleSnackbarClose, handleSignUp, handleLogin, addTodo, todos, updateTodo, deleteTodo, setListData, setTodos, }}>
            {children}
        </todoContext.Provider>
    )
}

export default TodoContext

export const useTodoContext = () => useContext(todoContext)
