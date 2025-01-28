
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";


import {
  Box,
  Typography,
  Container,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid2,
  Avatar,
  Divider,
  CssBaseline,
} from "@mui/material";
import Data from "../Data";


function Home() {
 
 const {posts} = Data(`http://localhost:3000/posts`)
 const slicedData = posts.slice(30,120)
 const {auth} = Data(`http://localhost:3000/authors`)
 
 const postByName = slicedData.map((post)=>{
  const author = auth.find((author)=>author.id==post.authorId)
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

const getCardColor = (index) => {
  const colors = ["#ffcccb", "#d1e7dd", "#cfe2ff", "#fef3c7"];
  return colors[index % colors.length];
};
 
  const latest = [...postByName].sort(() => 0.5 - Math.random());
  const latestPublished = latest.slice(0, 5);

  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState("");

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

  return (
    <>
     <CssBaseline />
    <Container style={{ background: "#fff", marginTop: "20px" }} maxWidth="lg">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1b4965" }}>
          Welcome to Our Blog
        </Typography>
        <TextField
          variant="outlined"
          placeholder="search posts...."
          value={search}
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
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: "#1b4965", paddingBottom: "10px" }}
        >
          Latest Posts
        </Typography>

        <Grid2 container spacing={4}>
          {posttobeshow.map((post,index) => (
            <Grid2 item xs={12} sm={6} md={4} key={post.postId}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card sx={{ height: "100%", background:getCardColor(index) }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        alt={post.author}
                        src={post.authorAvatar}
                        sx={{ mr: 2 }}
                      />
                        <Typography  variant="subtitle2" color="text.secondary">{`${post.AuthorName} ${post.AuthorLastName}`}</Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "center",
                        marginBottom: 1,
                        borderBottom: "2px solid #577590",
                        color: "#277da1",
                      }}
                    >
                      {post.postTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      <strong>Description:</strong> {post.postDesc}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      sx={{ marginTop: 1 }}
                    >
                      Published: {post.postPublish}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-start",gap:0,
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          alert(`You liked post: ${post.postTitle}`)
                        }
                      >
                        <FavoriteIcon sx={{ color: "#ff758f" }} />
                      </IconButton>
                      <Typography variant="body2">{post.postlikes}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton size="small" color="secondary">
                        <ModeCommentIcon
                          sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                        />
                      </IconButton>
                      <Typography variant="body2">
                        {post.postComments}
                      </Typography>
                    </Box>
                    <IconButton size="small" color="primary">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  </>

  );
}

export default Home;
