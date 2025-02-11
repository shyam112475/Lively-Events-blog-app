
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";


import {
  CircularProgress,
  Avatar,
  Container,
  Pagination,
  Box,
  IconButton,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid2,
  CssBaseline
} from "@mui/material";
import {Search} from "@mui/icons-material";
import { TextField } from "@mui/material";
import Updateposts from "./Updateposts"
import { useDispatch,useSelector } from "react-redux";
import { fetchPosts } from "../slices/PostSlice";
import { fetchAuthor } from "../slices/AuthorSlice";
function Posts() {
  const [query, setQuery] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch()
  const {posts,status} = useSelector(state=>state.posts)
  const {authors} = useSelector(state=>state.authors)
  useEffect(()=>{
  dispatch(fetchPosts())  
  dispatch(fetchAuthor())
},[dispatch])
const minposts = posts.slice(0,100)
  const postbyName = minposts.map((post)=>{
 const auth = authors.find(author=>author.id==post.authorId)
   return{
    postTitle:post.title,
    postdesc:post.description,
    postLikes:post.numLikes,
    postComments:post.numComments,
    postId:post.id,
    postPublished:post.datePublished,
    authorsName:auth.firstName,
    authorLastName:auth.lastName,
    authorID:auth.id
   }
  })
  const postPerPage = 10;
  const start = (count - 1) * postPerPage;
  const end = start + postPerPage;
  const pagedPosts = postbyName.slice(start, end);
 
  const handleSearch = (e) => {
    setQuery(e.target.value)
    const lowerCaseQuery = query.toLowerCase();
    const filtered = postbyName.filter(
      (post) =>
        post.postTitle.toLowerCase().includes(lowerCaseQuery) 
    );
    setFilteredData(filtered);
  };
  const postsToShow = query=="" ? pagedPosts:filteredData


  const deletePost = async (postId) => {
    var con = confirm('are you sure you want to delete this post?');
    if (con == true) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Post deleted successfully!");
        window.location.reload(); 
      } else {
        alert("Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  }else{
    alert("Post not deleted");
  }
  };
  if (status === "loading") 
    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          height: "50vh" 
        }}
      >
        <CircularProgress size={60} sx={{ color: "#277da1", mb: 2 }} />
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            color: "#264653", 
            fontWeight: "bold", 
            animation: "fadeIn 1.5s ease-in-out infinite"
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  
  return (
    <Container sx={{ background: '#f9f9f9', minHeight: '100vh', py: 4 }} maxWidth="lg">
    <CssBaseline />
    <Box sx={{ textAlign: "center", my: 4 }}>
      <TextField
        variant="outlined"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearch}
        sx={{
          width: "80%",
          maxWidth: "500px",
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: "25px",
            background: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
        InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
      />
    </Box>
  
    <Grid2 container spacing={3} justifyContent="center">
      {postsToShow.map((e) => (
        <Grid2 item key={e.postId} xs={12} sm={6} md={4} lg={3}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(to right, #ddeff7, #c2e9fb)",
                borderRadius: "16px",
                transition: "0.3s",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar alt={e.authorsName} src={e.authorLastName} sx={{ mr: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">{`${e.authorsName} ${e.authorLastName}`}</Typography>
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 2,
                    borderBottom: "2px solid #4a90e2",
                    color: '#0d47a1',
                  }}
                >
                  {e.postTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Description:</strong> {e.postdesc}
                </Typography>
                <Typography variant="body2" color="text.secondary">Published: {e.postPublished}</Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-start", px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small" color="primary">
                    <FavoriteIcon sx={{ color: "#ff6b81" }} />
                  </IconButton>
                  <Typography variant="body2">{e.postLikes}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small" color="secondary">
                    <ModeCommentIcon sx={{ fontSize: 18, color: "#007bff", mr: 0.5 }} />
                  </IconButton>
                  <Typography variant="body2">{e.postComments}</Typography>
                </Box>
                <IconButton size="small" color="primary">
                  <ShareIcon />
                </IconButton>
              </CardActions>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end", pb: 2, px: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/postdetails", {
                      state: {
                        title: e.postTitle,
                        description: e.postdesc,
                        postLikes: e.postLikes,
                        postComments: e.postComments,
                        postIds: e.postId,
                        publish: e.datePublished,
                      },
                    });
                  }}
                  sx={{ borderRadius: "8px" }}
                >
                  <ExpandMoreIcon /> More
                </Button>
                <Button
                  onClick={() => deletePost(e.postId)}
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "8px" }}
                >
                  <DeleteIcon /> Delete
                </Button>
                <Updateposts
                  title={e.postTitle}
                  description={e.postdesc}
                  id={e.postId}
                  date={e.postPublished}
                  authorId={e.authorID}
                  postLikes={e.postLikes}
                  postComments={e.postComments}
                />
              </CardActions>
            </Card>
          </motion.div>
        </Grid2>
      ))}
    </Grid2>
  
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
      <IconButton
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          setCount(count - 1);
        }}
      ></IconButton>
      <Pagination
        count={Math.ceil(posts.length / postPerPage)}
        page={currentPage}
        onChange={(event, value) => {
          setCurrentPage(value);
          setCount(value);
        }}
      />
      <IconButton
        disabled={currentPage === Math.ceil(posts.length / postPerPage)}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          setCount(count + 1);
        }}
      />
    </Box>
  </Container>
  
  );
}

export default Posts;
