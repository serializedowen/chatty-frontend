import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useValidation from '../utils/useValidation';
import axios from '../config/axios';

export default function CreateRoomDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setname, err, errMsg, validate] = useValidation(val => {
    console.log(val === '');
    if (val === '') {
      throw new Error('This field is required ');
    }
    if (val.length < 3) {
      throw new Error('Room name must be longer than 3 characters.');
    }
  });

  const createRoom = () => {
    validate().then(valid => {
      if (valid) {
        axios.post('/api/room', { name }).then(() => setOpen(false));
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of new room.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            error={err}
            onBlur={validate}
            onChange={e => setname(e.target.value)}
            label="Room Name"
            type="name"
            helperText={errMsg}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
