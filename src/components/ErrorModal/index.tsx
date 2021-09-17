import * as React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import errorImg from '../../assets/images/error.svg'

type ModalType = {
  errorMessage: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal({ errorMessage }:ModalType) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <div style={{
                textAlign: 'center',
              }}>
            <img 
              style={{
                height: '80px',
              }}
              src={errorImg}
              alt="Remover Pergunta" /> 
          </div>
          <Typography align='center' id="modal-modal-title" variant="h4" component="h2">
            {errorMessage}
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} variant="outlined">Voltar</Button>
          </Box>
        </Box>
      </Modal>
  );
}
