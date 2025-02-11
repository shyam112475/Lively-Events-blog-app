/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setdescription] = useState(props.description);
  const updatedData = {
    id: props.id,
    title,
    description,
    authorId: props.authorId,
    datePublished: new Date(),
    numLikes: props.postLikes,
    numComments: props.postComments,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    fetch(`http://localhost:3000/posts/${props.id}`, {
      method: "PUT",
      headers: { contentType: "application/json" },
      body: JSON.stringify(updatedData),
    });
    alert("post updated successfully");
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="contained" sx={{ backgroundColor: "#4CAF50", color: "white", '&:hover': { backgroundColor: "#388E3C" } }} onClick={handleClickOpen}>
        {<UpdateIcon />} Update
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { borderRadius: "12px" } }}>
        <DialogTitle sx={{ bgcolor: "#f8f9fa", color: "#333", fontWeight: "bold" }}>Update Post</DialogTitle>
        <DialogContent sx={{ bgcolor: "#f8f9fa" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: "8px" } }}
          />
          <TextField
            required
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            margin="dense"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: "8px" } }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f8f9fa", padding: "16px" }}>
          <Button onClick={handleClose} sx={{ color: "#6c757d" }}>Cancel</Button>
          <Button type="submit" onClick={handleUpdate} sx={{ backgroundColor: "#007BFF", color: "white", '&:hover': { backgroundColor: "#0056b3" } }}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

  );
}
