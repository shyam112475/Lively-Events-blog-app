import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  CardActions,
  Box,
  CardContent,
  IconButton,
  Card,
  Grid2,
  CssBaseline
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useLocation } from "react-router-dom";
import Data from "../Data";


function PostDetails() {
  const { auth } = Data(`http://localhost:3000/authors`);

  const { posts } = Data(`http://localhost:3000/posts`);

  const [openLikes, setOpenLikes] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const handleOpenLikes = () => setOpenLikes(true);
  const handleCloseLikes = () => setOpenLikes(false);

  const handleOpenComments = () => setOpenComments(true);
  const handleCloseComments = () => setOpenComments(false);

  const location = useLocation();
  const { postIds, title, description, postLikes, postComments, publish } =
    location.state || {};
  const { comments } = Data(`http://localhost:3000/comments`);

  const commentData = comments.filter((p) => p.postId == postIds);
  const comentswithfulldetails = commentData.map((comment) => {
    const author = auth.find((author) => author.id == comment.authorId);
    const post = posts.find((post) => post.id == comment.postId);

    return {
      commentId: comment.id,
      commentText: comment.text,
      authorName: author ? author.firstName : "shyam",
      authorLastName: author ? author.lastName : "shyam",
      postTitle: post ? post.title : "Unknown Post",
    };
  });
  const { likes } = Data("http://localhost:3000/likes");

  const likedData = likes.filter((like) => like.postId == postIds);
  const likeswithfulldetail = likedData.map((like) => {
    const author = auth.find((author) => author.id == like.authorId);
    const post = posts.find((post) => post.id == like.postId);

    return {
      likeId: like.id,
      likerName: author ? author.firstName : "unkown",
      likerLastName: author.lastName,
      postId: post.id,
      date: like.datePublished,
    };
  });

  return (
    <div style={{ marginTop: "50px",marginBottom:'250px' }}>
      <CssBaseline/>
      
      <Typography variant="h6" gutterBottom>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" ,bgcolor:'#e9ecef'}}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center", marginBottom: 1 }}
                style={{ borderBottom: "2px solid #577590", color: "#277da1" }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Description:</strong> {description}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ marginTop: 1 }}
              >
                Publish : {publish}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-start" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" color="primary">
                  <FavoriteIcon style={{ color: "#ff758f" }} />
                </IconButton>
                <Typography variant="body2">{postLikes}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" color="secondary">
                  <ModeCommentIcon
                    sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                  />
                </IconButton>
                <Typography variant="body2">{postComments}</Typography>
                <IconButton size="small" color="primary">
                      <ShareIcon />
                    </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Grid2>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<FavoriteIcon />}
          onClick={handleOpenLikes}
          sx={{ marginRight: 2 }}
        >
          Show Likes
        </Button>
        <Button
          variant="outlined"
          startIcon={<ModeCommentIcon />}
          onClick={handleOpenComments}
        >
          Show Comments
        </Button>
      </Box>
      <Dialog
        open={openLikes}
        onClose={handleCloseLikes}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{color:'#0077b6',background:'#e9ecef'}}>People Who Liked This Post</DialogTitle>
        <DialogContent  sx={{background:'#e9ecef'}} >
          <List  sx={{background:'#e9ecef'}}>
            {likeswithfulldetail.length > 0 ? (
              likeswithfulldetail.map((user) => (
                <ListItem
                  key={user.likeId}
                  style={{ borderBottom: "1px solid #577590" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user.name}
                      src={user.avatarUrl} // Add the avatar URL here
                    />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={<span>{user.likerName} {user.likerLastName}</span>} // Display user comment here
                  />
                 
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary"  sx={{background:'#e9ecef'}}>
                No likes yet.
              </Typography>
            )}
          </List>
        </DialogContent >
      </Dialog>

      <Dialog
        open={openComments}
        onClose={handleCloseComments}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{color:'#0077b6',background:'#e9ecef'}}>People Who Commented on This Post</DialogTitle>
        <DialogContent  sx={{background:'#e9ecef'}}>
          <List>
            {comentswithfulldetails.length > 0 ? (
              comentswithfulldetails.map((user) => (
                <ListItem
                  key={user.commentId}
                  style={{ borderBottom: "1px solid #577590",}}

                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user.firstName}
                      src={user.firstName} // Add the avatar URL here
                    />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={<span>{user.authorName} {user.authorLastName}</span>} // Display user comment here
                  />
                 
                  {user.commentText}
                 
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostDetails;
