import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Navbar = () => {
  const [aneev, setAneev] = useState(<HomeIcon />);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:'#277da1'}}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {aneev}
          </IconButton>
          <Typography variant="h5" component="h5" gutterBottom sx={{ fontWeight: "bold",  }} style={{marginTop:'6px',color:'#94bbe9'}}>
          Lively Events
        </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="../imgs/letter-v.png" alt="" className="logo" />
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <NavLink style={ ({ isActive }) =>isActive? { color: "#fff", fontWeight: "bold", textDecoration: "2px solid #fff underline", '&:hover':{textDecoration:'2px solid #94bbe9 underline'} }: { color: "#333", textDecoration: "none" }} onClick={() => { setAneev(<HomeIcon />); }} to="/">
              <Typography  variant="h6" component="div" sx={{color:"#fff", padding: 1,'&:hover':{color:'#94bbe9'} }}>
                Home
              </Typography>
            </NavLink>
            <NavLink style={ ({ isActive }) =>isActive? { color: "#fff", fontWeight: "bold", textDecoration: "2px solid #fff underline",'&:hover':{textDecoration:'2px solid #94bbe9 underline'} }: { color: "#333", textDecoration: "none" }}   onClick={() => { setAneev(<PersonIcon />); }} to="/author" >
              <Typography variant="h6" component="div" sx={{color:"#fff", padding: 1,'&:hover':{color:'#94bbe9'} }}>
                Auther
              </Typography>
            </NavLink>
            <NavLink onClick={() => { setAneev(<PostAddIcon />); }} to="/post" style={ ({ isActive }) =>isActive? { color: "#fff", fontWeight: "bold", textDecoration: "2px solid #fff underline",'&:hover':{textDecoration:'2px solid #94bbe9 underline'} }: { color: "#333", textDecoration: "none" }}>
              <Typography variant="h6" component="div" sx={{ color:'#fff', padding: 1,'&:hover':{color:'#94bbe9'} }}>
                Posts
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;