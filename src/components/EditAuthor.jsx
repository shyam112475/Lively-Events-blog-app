/* eslint-disable react/prop-types */
import * as React from "react";
import {useState} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { useNavigate } from "react-router-dom";

function EditAuthor(props) {
  const [firstName,setFirstName] = useState(props.firstName)
  const [lastName,setLastName] = useState(props.lastName)
  const [phone,setPhone] = useState(props.phone)
  const [open, setOpen] = useState(false);
 const navigate = useNavigate()
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const autherUpdate = {
      id:props.id,
      firstName:firstName,
      lastName:lastName,
      phone:phone,
      numLikes:props.numLikes,
      numComments:props.numComments
    }
     const handleEdit=()=>{
      fetch(`http://localhost:3000/authors/${props.id}`,{
        method:'PUT',
        headers:{'contentType':'application/json'},
        body:JSON.stringify(autherUpdate)
      })
      alert('edited succesfully')
      navigate('/author')
      
  }
  return (
    <React.Fragment>
      <Button color="success" onClick={handleClickOpen}>
        <UpdateIcon/><span>edite</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: "#e9ecef" }}>Update Author</DialogTitle>
        <DialogContent sx={{ bgcolor: "#e9ecef" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            fullWidth
            multiline
            variant="outlined"
          />
           <TextField
            margin="dense"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            fullWidth
            multiline
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#e9ecef" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleEdit} color="primary">
            apply change
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditAuthor
