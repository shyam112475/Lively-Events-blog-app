import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthorRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    const newAuthor = {
      firstName,
      lastName,
      phone,
      numLikes: "0",
      numComments: "0",
    };
    try {
      await fetch(`http://localhost:3000/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAuthor),
      });
      alert("Author registered successfully");
      navigate("/author");
    } catch (error) {
      alert("Registration failed. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        backgroundColor: "#ffffff",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <CssBaseline />
      <Box textAlign="center" mb={3}>
        <Avatar sx={{ m: "auto", bgcolor: "#277da1", width: 72, height: 72 }}>
          <PersonAddIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: "bold" }}>
          Register Author
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& .MuiTextField-root": {
            borderRadius: 2,
          },
        }}
      >
        <TextField
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="tel"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: "25px",
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#206b8c",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </Box>
    </Container>
  );
}

export default AuthorRegister;
