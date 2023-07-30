import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppSelector, useAppDispatch } from '../hooks/appHooks';  
import { closeModal } from '../features/modalSlice';
import "./Modal.css"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 24,
    borderRadius: "25px",
    p: 4,
  };

export default function AppModal() {
    const dispatch = useAppDispatch();
    const { isOpen, title, content } = useAppSelector((state) => state.modal)
    return (
        <Modal
            open={isOpen}
            onClose={() => { dispatch(closeModal()); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ borderRadius: "50px" }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                {content}
            </Box>
        </Modal>
    )
}
