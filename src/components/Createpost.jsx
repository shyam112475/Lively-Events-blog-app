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
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Post
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "#f7f9fc",
          p: 4,
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Post Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Author ID"
          variant="outlined"
          fullWidth
          type="number"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? "Creating Post..." : "Create Post"}
        </Button>
      </Box>
    </Container>
  );
}

export default CreatePost;
