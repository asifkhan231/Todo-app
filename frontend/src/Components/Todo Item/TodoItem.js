import React, { useActionState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useTodoContext } from '../../Context/TodoContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export default function EditTodoModal({ handleClose, open, editData }) {
    const { updateTodo } = useTodoContext()
    const [editForm, submitHandler, isPanding] = useActionState(editHandler, {
        data: null,
        error: null
    })

    async function editHandler(preState, data) {
        let todoInp = data.get('todo')
        console.log(todoInp)
        try {
            if (!todoInp) {
                throw new Error('Please fill all the fields')
            }
            let isComplete = editData.isComplete
            let id = editData.id
            await updateTodo(id, { task: todoInp, isComplete })
            await handleClose()
        } catch (error) {
            console.error('during updating something went wrong', error)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4>Edit Todo</h4>
                    <form action={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} >
                        <TextField id="outlined-basic" label={editData.task} variant="outlined" name='todo' placeholder={editData.task} />
                        <Button variant="contained" color="primary" type='submit'>{isPanding?"updating...":'Edit'}</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
