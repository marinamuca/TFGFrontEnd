import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ModalButton.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '0px',
  boxShadow: 24,
  borderRadius: "25px",
  p: 4
};

interface ModalProps {
  modalContent: JSX.Element;
  buttonLabel: string;
  title?: string;
}

export default function ModalButton(props: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{margin: "auto"}}>
      <Button variant='contained' color='secondary' onClick={handleOpen}>{props.buttonLabel}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{borderRadius: "50px"}}
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            {props.modalContent}
        </Box>
      </Modal>
    </div>
  );
}
