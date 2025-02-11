import { useEffect, useState } from "react";
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
  CssBaseline,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../slices/CommentSlice";
import { fetchAuthor } from "../slices/AuthorSlice";
import { fetchPosts } from "../slices/PostSlice";
import { fetchLikes } from "../slices/LikeSlice";

function PostDetails() {
  const dispatch = useDispatch();
  const { comments, status } = useSelector((state) => state.comments);
  const {likes}=useSelector(state=>state.likes)
  const {posts}=useSelector(state=>state.posts)
  const {authors}= useSelector(state=>state.authors)
  useEffect(() => {
    if (status === "idle") dispatch(fetchComments());
    dispatch(fetchAuthor())
    dispatch(fetchPosts())
    dispatch(fetchLikes())
    dispatch(fetchComments())
  }, [status, dispatch]);
  const [openLikes, setOpenLikes] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const handleOpenLikes = () => setOpenLikes(true);
  const handleCloseLikes = () => setOpenLikes(false);

  const handleOpenComments = () => setOpenComments(true);
  const handleCloseComments = () => setOpenComments(false);

  const location = useLocation();
  const { postIds, title, description, postLikes, postComments, publish } =
    location.state || {};
  const commentData = comments.filter((p) => p.postId == postIds);
  const comentswithfulldetails = commentData.map((comment) => {
    const author = authors.find((author) => author.id == comment.authorId);
    const post = posts.find((post) => post.id == comment.postId);

    return {
      commentId: comment.id,
      commentText: comment.text,
      authorName: author ? author.firstName : "chota",
      authorLastName: author ? author.lastName : "bheem",
      postTitle: post ? post.title : "dholakpur",
    };
  });

  const likedData = likes.filter((like) => like.postId == postIds);
  const likeswithfulldetail = likedData.map((like) => {
    const author = authors.find((author) => author.id == like.authorId);
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
    <div style={{ marginTop: "50px", marginBottom: "250px" }}>
    <CssBaseline />

    <Grid2 item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", bgcolor: "#f8f9fa", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mb: 2, borderBottom: "2px solid #457b9d", color: "#1d3557" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <strong>Description:</strong> {description}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Published: {publish}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-start", px: 2, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ color: "#e63946" }}>
              <FavoriteIcon />
            </IconButton>
            <Typography variant="body2">{postLikes}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ color: "#457b9d" }}>
              <ModeCommentIcon />
            </IconButton>
            <Typography variant="body2">{postComments}</Typography>
            <IconButton size="small" sx={{ color: "#2a9d8f" }}>
              <ShareIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid2>

    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Button variant="contained" color="error" startIcon={<FavoriteIcon />} onClick={handleOpenLikes} sx={{ mr: 2 }}>
        Show Likes
      </Button>
      <Button variant="contained" color="primary" startIcon={<ModeCommentIcon />} onClick={handleOpenComments}>
        Show Comments
      </Button>
    </Box>

    {/* Likes Dialog */}
    <Dialog open={openLikes} onClose={handleCloseLikes} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#1d3557", background: "#f1faee" }}>People Who Liked This Post</DialogTitle>
      <DialogContent sx={{ background: "#f1faee" }}>
        <List>
          {likeswithfulldetail.length > 0 ? (
            likeswithfulldetail.map((user) => (
              <ListItem key={user.likeId} sx={{ borderBottom: "1px solid #457b9d" }}>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText secondary={`${user.likerName} ${user.likerLastName}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
              No likes yet.
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>

    {/* Comments Dialog */}
    <Dialog open={openComments} onClose={handleCloseComments} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#1d3557", background: "#f1faee" }}>People Who Commented on This Post</DialogTitle>
      <DialogContent sx={{ background: "#f1faee" }}>
        <List>
          {comentswithfulldetails.length > 0 ? (
            comentswithfulldetails.map((user) => (
              <ListItem key={user.commentId} sx={{ borderBottom: "1px solid #457b9d" }}>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText secondary={`${user.authorName} ${user.authorLastName}`} />
                {user.commentText}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
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
