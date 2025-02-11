import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, CssBaseline } from "@mui/material";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !authorId) {
      alert("plz fill all feilds...");
      return;
    }

    setLoading(true);
    const newPost = {
      id:parseInt(Math.random()),
      title,
      description,
      authorId: parseInt(authorId),
      numLikes: 0,
      numComments: 0,
      datePublished: new Date()
    };

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/post");
      } else {
        alert("Failed to create the post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
    <CssBaseline />
    <Typography
      variant="h4"
      align="center"
      gutterBottom
      sx={{ fontWeight: "bold", color: "#1b4965" }}
    >
      Create a New Post
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        p: 4,
        borderRadius: "12px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ bgcolor: "#fff", borderRadius: "6px" }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ bgcolor: "#fff", borderRadius: "6px" }}
      />
      <TextField
        label="Author ID"
        variant="outlined"
        fullWidth
        type="number"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        sx={{ bgcolor: "#fff", borderRadius: "6px" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#0077b6",
          color: "white",
          fontWeight: "bold",
          py: 1.5,
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": { bgcolor: "#023e8a", transform: "scale(1.05)" },
        }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Creating Post..." : "Create Post"}
      </Button>
    </Box>
  </Container>
  
  );
}

export default CreatePost;
