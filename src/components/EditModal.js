import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({handleClose,student,handleEdit}) {
    const {name, address,id} = student
    const [updatedAddress, setupdatedAddress] = React.useState(address)
    const [updatedName, setupdatedName] = React.useState(name)
    const updatedData= {id,address:updatedAddress, name:updatedName}
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box style={{float:"right"}}>
        <IconButton onClick={handleClose}>
            <CloseIcon/>
        </IconButton>
        </Box>
        <TextField style={{marginBottom:"10px"}}id="outlined-basic" value={updatedName}label="Student Name" variant="outlined" onChange={(e)=>setupdatedName(e.target.value)} fullWidth/>
            <TextField id="outlined-basic" value={updatedAddress}label="Student Address" variant="outlined"onChange={(e)=>setupdatedAddress(e.target.value)} fullWidth/>
            <Button style={{marginTop:"10px"}}variant="contained" onClick={()=>handleEdit(updatedData)}>Done</Button>
        </Box>
      </Modal>
    </div>
  );
}
