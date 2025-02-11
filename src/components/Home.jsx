
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid2,
  Avatar,
  Divider,
} from "@mui/material";
import {Search } from "@mui/icons-material";
import { useSelector,useDispatch } from "react-redux";
import { fetchAuthor } from "../slices/AuthorSlice";
import { fetchPosts } from "../slices/PostSlice";

function Home() {
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState("");
const dispatch = useDispatch()
 const {posts,status} = useSelector(state=>state.posts)
 const {authors} = useSelector(state=>state.authors)
 const slicedData = posts.slice(0,5)
 useEffect(()=>{
  dispatch(fetchAuthor())
  dispatch(fetchPosts())
 },[dispatch])
 const postByName = slicedData.map((post)=>{
  const author = authors.find((author)=>author.id==post.authorId)
  return{
    AuthorName:author.firstName,
    AuthorLastName:author.lastName,
    postId:post.id,
    postTitle:post.title,
    postDesc:post.description,
    postlikes:post.numLikes,
    postComments:post.numComments,
    postPublish:post.datePublished
  }
})

  const latestPublished = [...postByName].sort(() => 0.5 - Math.random());

  

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const lowerCaseQuery = search.toLowerCase()
   const filtered = postByName.filter((post) =>
      post.postTitle.toLowerCase().includes(lowerCaseQuery) ||
    post.postDesc.toLowerCase().includes(lowerCaseQuery)
  );
  setFilteredPosts(filtered)
  };
  const posttobeshow = search==""?latestPublished:filteredPosts
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
    <>
      <Container maxWidth="lg" sx={{ background: "#f8fafc", py: 5, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: "#1b4965", letterSpacing: 1, mb: 2 }}
          >
            Welcome to Our Blog 🚀
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }}>
            <TextField
              variant="outlined"
              placeholder="Search posts..."
              value={search}
              onChange={handleSearch}
              sx={{
                width: "80%",
                maxWidth: "500px",
                mb: 4,
                borderRadius: "25px",
                background: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
              InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
            />
          </motion.div>
        </Box>

        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1b4965", mb: 3 }}>
          Latest Posts
        </Typography>

        <Grid2 container spacing={4}>
          {posttobeshow.map((post,) => (
            <Grid2 item xs={12} sm={6} md={4} key={post.postId}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card sx={{ height: "100%", background: "#e3f2fd", borderRadius: 3, boxShadow: 4 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar alt={post.AuthorName} src={post.authorAvatar} sx={{ mr: 2 }} />
                      <Typography variant="subtitle1" fontWeight="bold" color="#0d47a1">
                        {`${post.AuthorName} ${post.AuthorLastName}`}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      textAlign="center"
                      color="#01579b"
                      sx={{ borderBottom: "3px solid #0277bd", pb: 1, mb: 1 }}
                    >
                      {post.postTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Description:</strong> {post.postDesc}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" color="text.secondary">
                      Published: {post.postPublish}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-start", px: 2, pb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <IconButton size="small" color="primary">
                        <FavoriteIcon sx={{ color: "#e91e63" }} />
                      </IconButton>
                      <Typography variant="body2">{post.postlikes}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <IconButton size="small" color="secondary">
                        <ModeCommentIcon sx={{ color: "#1565c0" }} />
                      </IconButton>
                      <Typography variant="body2">{post.postComments}</Typography>
                    </Box>
                    <IconButton size="small" color="primary">
                      <ShareIcon sx={{ color: "#00897b" }} />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>

  );
}

export default Home;
