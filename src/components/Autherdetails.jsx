import { useState } from "react";
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
import { useLocation } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Data from "../Data";
import EditAuthor from "./EditAuthor";
import { motion } from "framer-motion";

function AuthorDetails() {
  const location = useLocation();
  const { posts } = Data(`http://localhost:3000/posts`);
  const { authorId, likes, comments, phone, firstName, lastName,numPosts } = location.state || {};
  const filteredPosts = posts.filter((post) => post.authorId == authorId);
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

  return (
    <>
      <CssBaseline />
      <Box sx={{ mt: 6, mx: "auto", width: "90%", maxWidth: "1200px" }}>
        {!showLikes && !showComments && (
          <Card sx={{ mb: 4, p: 3, textAlign: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                sx={{ bgcolor: "#277da1", width: 90, height: 90, fontSize: 35 }}
              >
                {firstName?.[0]}
              </Avatar>
            </Stack>
            <Typography variant="h4" sx={{ mt: 2, color: "#264653" }}>
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, color: "#4a5759" }}>
              <LocalPhoneIcon sx={{ mr: 1 }} /> {phone}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}
            >
              <Typography variant="body2">
                <FavoriteIcon
                  sx={{ fontSize: 18, color: "#ff758f", mr: 0.5 }}
                />
                {likes}
              </Typography>
              <Typography variant="body2">
                <ModeCommentIcon
                  sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                />
                {comments}
              </Typography>
            </Box>
            <Button sx={{width:'20%',marginTop:'20px'}} variant="outlined" color="success">
                    <EditAuthor firstName={firstName} lastName={lastName} phone={phone} id={authorId} numLikes={likes} numComments={comments} numPosts={numPosts}/>
                    </Button>
          </Card>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleToggleLikes}
            sx={{ display: showLikes ? "none" : "block" }}
          >
            {showLikes ? "Back" : "Top Liked Posts"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleToggleComments}
            sx={{ display: showComments ? "none" : "block" }}
          >
            {showComments ? "Back" : "Top Commented Posts"}
          </Button>
        </Box>
        {showLikes && (
          <Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 3, color: "#264653" }}
            >
              Authors Most Liked Posts
            </Typography>
            <Grid2 container spacing={3}>
              {topLikedPosts.map((post) => (
                <Grid2 item xs={12} sm={6} md={4} key={post.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card sx={{ height: "100%", bgcolor: "#d1e7dd" }}>
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                        ></Typography>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ textAlign: "center", marginBottom: 1 }}
                          style={{
                            borderBottom: "2px solid #577590",
                            color: "#277da1",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          <strong>Description:</strong> {post.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ marginTop: 1 }}
                        >
                          Published: {post.datePublished}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "flex-start" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton size="small" color="primary">
                            <FavoriteIcon style={{ color: "#ff758f" }} />
                          </IconButton>
                          <Typography variant="body2">
                            {post.numLikes}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton size="small" color="secondary">
                            <ModeCommentIcon
                              sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                            />
                          </IconButton>
                          <Typography variant="body2">
                            {post.numComments}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        )}

        {showComments && (
          <Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 3, color: "#264653" }}
            >
              Authors Most Commented Posts
            </Typography>
            <Grid2 container spacing={3}>
              {topCommentedPosts.map((post) => (
                <Grid2 item xs={12} sm={6} md={4} key={post.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card sx={{ height: "100%", bgcolor:"#d1e7dd"}}>
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ textAlign: "center", marginBottom: 1 }}
                          style={{
                            borderBottom: "2px solid #577590",
                            color: "#277da1",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          <strong>Description:</strong> {post.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ marginTop: 1 }}
                        >
                          Published: {post.datePublished}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "flex-start" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton size="small" color="primary">
                            <FavoriteIcon style={{ color: "#ff758f" }} />
                          </IconButton>
                          <Typography variant="body2">
                            {post.numLikes}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton size="small" color="secondary">
                            <ModeCommentIcon
                              sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                            />
                          </IconButton>
                          <Typography variant="body2">
                            {post.numComments}
                          </Typography>
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
