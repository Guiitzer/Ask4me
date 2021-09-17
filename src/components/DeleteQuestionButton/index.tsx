import * as React from 'react';
import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import deleteImg from '../../assets/images/delete.svg'
import { database } from '../../services/firebase';

type ButtonType = {
  id: string;
  room: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function DeleteQuestionButton({ id, room }:ButtonType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleDeleteQuestion(){
    await database.ref(`rooms/${room}/questions/${id}`).remove();
  }

  return (
    <div>
      <Tooltip title="Remover Pergunta">
      <button 
        onClick={handleOpen}
        >
        <img src={deleteImg} alt="Remover Pergunta" />  
      </button>
      </Tooltip>
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
                height: '50px',
              }}
              src={deleteImg}
              alt="Remover Pergunta" /> 
          </div>
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            Excluir pergunta
          </Typography>
          
          <Typography align='center' id="modal-modal-description" sx={{ mt: 2 }}>
            Tem certeza que deseja excluir a pergunta?     
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={handleClose} variant="outlined"  >Cancelar</Button>
            <Button onClick={handleDeleteQuestion} variant="outlined" color="error">Sim, excluir</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
