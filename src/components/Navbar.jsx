import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState(<HomeIcon />);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#1e3a8a", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <Toolbar>
            <motion.div whileHover={{ scale: 1.2 }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                {activeIcon}
              </IconButton>
            </motion.div>
            <Typography variant="h5" component="h5" sx={{ fontWeight: "bold", color: "#94bbe9", flexGrow: 1, textTransform: "uppercase" }}>
              Lively Events
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {[
                { to: "/", icon: <HomeIcon />, label: "Home" },
                { to: "/author", icon: <PersonIcon />, label: "Author" },
                { to: "/post", icon: <PostAddIcon />, label: "Posts" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setActiveIcon(item.icon)}
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#94bbe9",
                    fontWeight: isActive ? "bold" : "normal",
                    textDecoration:'none',
                    position: "relative",
                    padding: "8px 16px",
                    transition: "color 0.3s ease-in-out",
                  })}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Typography variant="h6" sx={{ position: "relative" }}>
                      {item.label}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          height: "2px",
                          backgroundColor: "#fff",
                          position: "absolute",
                          bottom: "-4px",
                          left: 0,
                        }}
                      ></motion.div>
                    </Typography>
                  </motion.div>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </motion.div>
  );
};

export default Navbar;
