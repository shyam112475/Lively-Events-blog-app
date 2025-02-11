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
    <Button
     variant="outlined"
      onClick={handleClickOpen}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        bgcolor: "#2d6a4f",
        color: "white",
        display:'felx',
        justifyContent:'center',
        alignItems:'center',
        width:'200px',
        "&:hover": { bgcolor: "#40916c" },
      }}
    >
      <UpdateIcon sx={{ mr: 1, }} />
       Edit
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          backgroundColor: "#f8f9fa",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle sx={{ bgcolor: "#e9ecef", fontWeight: "bold", color: "#1b4965" }}>
        Update Author
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#e9ecef", pb: 3 }}>
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
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#e9ecef", px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            fontWeight: "bold",
            color: "#d62828",
            "&:hover": { color: "#e63946" },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleEdit}
          sx={{
            fontWeight: "bold",
            bgcolor: "#0077b6",
            color: "white",
            "&:hover": { bgcolor: "#023e8a" },
          }}
        >
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  
  );
}

export default EditAuthor
