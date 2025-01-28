import Data from "../Data";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";

import {
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
import { TextField } from "@mui/material";
import Updateposts from "./Updateposts"

function Posts() {
  const [count, setCount] = useState(1);
  const { posts, error, loading } = Data(`http://localhost:3000/posts`);
  console.log(posts.length)
  const {auth} = Data('http://localhost:3000/authors')
  const reducedData = posts.slice(0,500)
  const postbyName = reducedData.map((post)=>{
  const authors = auth.find(author=>author.id==post.authorId)

   return{
    postTitle:post.title,
    postdesc:post.description,
    postLikes:post.numLikes,
    postComments:post.numComments,
    postId:post.id,
    postPublished:post.datePublished,
    authorsName:authors.firstName,
    authorLastName:authors.lastName,
    authorID:authors.id
   }
  })
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const postPerPage = 10;
  const start = (count - 1) * postPerPage;
  const end = start + postPerPage;
  const pagedPosts = postbyName.slice(start, end);
  const [query, setQuery] = useState("");
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
  if (loading) {
    return (
      <p
        style={{
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "300px",
        }}
      >
        Bs Thoda Or Intazarr...
      </p>
    );
  }

  if (error) {
    return (
      <p
        style={{
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "300px",
        }}
      >
        Error: {error.message}
      </p>
    );
  }

  return (
    <Container sx={{background:'#ffffff'}}  maxWidth="lg">
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
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />
      </Box>

     
      <Grid2 container spacing={3} justifyContent="center">
        {postsToShow.map((e) => (
          <Grid2 item key={e.postId} xs={12} sm={6} md={4} lg={3} >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow:'2px',
                background:"#d1e7dd"
              }}
            >
               
              <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        alt={e.authorsName}
                        src={e.authorLastName}
                        sx={{ mr: 2 }}
                      />
                        <Typography  variant="subtitle2" color="text.secondary">{`${e.authorsName} ${e.authorLastName}`}</Typography>
                    </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                   borderBottom:'2px solid #577590',
                   
                    color:'#277da1'
                  }}
                >
                  {e.postTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Description:</strong> {e.postdesc}
                  </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                 
                >
                  Published: {e.postPublished}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="primary">
                      <FavoriteIcon style={{color:"#ff758f"}}/>
                    </IconButton>
                    <Typography variant="body2">{e.postLikes}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="secondary">
                    <ModeCommentIcon
                        sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                      />
                    </IconButton>
                    <Typography variant="body2">{e.postComments}</Typography>
                  </Box>
                  <IconButton size="small" color="primary">
                      <ShareIcon />
                    </IconButton>
              </CardActions>
              <CardActions
                sx={{ display: "flex", justifyContent: "flex-end"}}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigate("/postdetails", {
                      state: {
                        title: e.postTitle,
                        description:e.postdesc,
                        postLikes:e.postLikes,
                        postComments:e.postComments,
                        postIds: e.postId,
                        publish:e.datePublished
                      },
                    });
                  }}
                >
                <ExpandMoreIcon/>  More
                </Button>
                <Button
                  onClick={() => deletePost(e.postId)}
                  variant="outlined"
                  color="error"
                >
                <DeleteIcon/>  Delete
                </Button>
                <Updateposts title={e.postTitle} description={e.postdesc} id={e.postId} date={e.postPublished} authorId={e.authorID} postLikes={e.postLikes} postComments={e.postComments} />
              </CardActions>
            </Card>
          </motion.div>
          </Grid2>
        ))}
      
      </Grid2>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <IconButton
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setCount(count - 1);
          }}
        >
        </IconButton>
        <Pagination
          count={Math.ceil(reducedData.length / postPerPage)}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            setCount(value);
          }}
        />
        <IconButton
          disabled={currentPage === Math.ceil(reducedData.length / postPerPage)}
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
