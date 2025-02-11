import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid2,
  Stack,
  CardActions,
  IconButton,
  CssBaseline,
} from "@mui/material";
import {useParams } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import EditAuthor from "./EditAuthor";
import { motion } from "framer-motion";
import { useDispatch,useSelector } from "react-redux";
import { fetchPosts } from "../slices/PostSlice";
import { fetchAuthor } from "../slices/AuthorSlice";
function AuthorDetails() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const {posts,status} = useSelector(state=>state.posts)
  const {authors} = useSelector(state=>state.authors)
  useEffect(()=>{
    if(status==="success")dispatch(fetchPosts)
    dispatch(fetchAuthor())
  },[dispatch,status])
  
  const selectedAuth = authors.find(e=>e.id==id)

  const filteredPosts = posts.filter((post) => post.authorId == id);
  const sortedByLikes = [...filteredPosts].sort(
    (a, b) => b.numLikes - a.numLikes
  );
  const sortedByComments = [...filteredPosts].sort(
    (a, b) => b.numComments - a.numComments
  );
  const topLikedPosts = sortedByLikes.slice(0, 5);
  const topCommentedPosts = sortedByComments.slice(0, 5);

  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const handleToggleLikes = () => {
    setShowLikes((prev) => !prev);
    setShowComments(false);
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
    setShowLikes(false);
  };
  if(status==="loading") return(<><p>Loading</p></>)
  return (
    <>
   <CssBaseline />
<Box sx={{ mt: 6, mx: "auto", width: "50%", maxWidth: "1200px" }}>
  {!showLikes && !showComments && (
    <Card
      sx={{
        mb: 4,
        p: 3,
        textAlign: "center",
        bgcolor: "white",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
        borderRadius: "12px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <Avatar
          sx={{
            bgcolor: "#277da1",
            width: 90,
            height: 90,
            fontSize: 35,
            transition: "0.3s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          {selectedAuth.firstName?.[0]}
        </Avatar>
      </Stack>
      <Typography variant="h4" sx={{ mt: 2, color: "#264653", fontWeight: "bold" }}>
        {`${selectedAuth.firstName} ${selectedAuth.lastName}`}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, color: "#4a5759" }}>
        <LocalPhoneIcon sx={{ mr: 1, color: "#ff6b6b" }} /> {selectedAuth.phone}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}>
        <Typography variant="body2">
          <FavoriteIcon sx={{ fontSize: 18, color: "#ff758f", mr: 0.5 }} />
          {selectedAuth.numLikes}
        </Typography>
        <Typography variant="body2">
          <ModeCommentIcon sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }} />
          {selectedAuth.numComments}
        </Typography>
      </Box>
      <Button

      >
        <EditAuthor
          firstName={selectedAuth.firstName}
          lastName={selectedAuth.lastName}
          phone={selectedAuth.phone}
          id={selectedAuth.id}
          numLikes={selectedAuth.numLikes}
          numComments={selectedAuth.numComments}
          numPosts={selectedAuth.numPosts}
        />
      </Button>
    </Card>
  )}

  {/* Toggle Buttons */}
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 5,marginLeft:'10px' }}>
    <Button
      variant="contained"
      color="error"
      onClick={handleToggleLikes}
      sx={{ display: showLikes ? "none" : "block" ,width:'210px'}}
    >
      {showLikes ? "Back" : "Top Liked Posts"}
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleToggleComments}
      sx={{ display: showComments ? "none" : "block" }}
    >
      {showComments ? "Back" : "Top Commented Posts"}
    </Button>
  </Box>

  {/* Most Liked Posts */}
  {showLikes && (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3, color: "#264653", fontWeight: "bold" }}>
        Authors Most Liked Posts
      </Typography>
      <Grid2 container spacing={3}>
        {topLikedPosts.map((post) => (
          <Grid2 item xs={12} sm={6} md={4} key={post.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card sx={{ height: "100%", bgcolor: "#d1e7dd", borderRadius: "10px", p: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: "center", mb: 1, color: "#277da1" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Description:</strong> {post.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Published: {post.datePublished}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="primary">
                      <FavoriteIcon style={{ color: "#ff758f" }} />
                    </IconButton>
                    <Typography variant="body2">{post.numLikes}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="secondary">
                      <ModeCommentIcon sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }} />
                    </IconButton>
                    <Typography variant="body2">{post.numComments}</Typography>
                  </Box>
                </CardActions>
              </Card>
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )}

  {/* Most Commented Posts */}
  {showComments && (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3, color: "#264653", fontWeight: "bold" }}>
        Authors Most Commented Posts
      </Typography>
      <Grid2 container spacing={3}>
        {topCommentedPosts.map((post) => (
          <Grid2 item xs={12} sm={6} md={4} key={post.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card sx={{ height: "100%", bgcolor: "#d1e7dd", borderRadius: "10px", p: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: "center", mb: 1, color: "#277da1" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Description:</strong> {post.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Published: {post.datePublished}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="primary">
                      <FavoriteIcon style={{ color: "#ff758f" }} />
                    </IconButton>
                    <Typography variant="body2">{post.numLikes}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="small" color="secondary">
                      <ModeCommentIcon sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }} />
                    </IconButton>
                    <Typography variant="body2">{post.numComments}</Typography>
                  </Box>
                </CardActions>
              </Card>
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )}
</Box>

    </>
  );
}

export default AuthorDetails;
