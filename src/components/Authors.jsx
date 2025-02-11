import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthor } from "../slices/AuthorSlice";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Pagination,
  TextField,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";
import { Favorite, ModeComment, Search } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Authors() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authors, status } = useSelector((state) => state.authors);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAuthor());
  }, [dispatch]);

  const cardPerPage = 16;
  const start = (currentPage - 1) * cardPerPage;
  const end = start + cardPerPage;
  const filteredAuthors = search
    ? authors.filter((author) =>
        `${author.firstName} ${author.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : authors;
  const displayedAuthors = filteredAuthors.slice(start, end);

  const handleSearch = (e) => setSearch(e.target.value);
  const handlePageChange = (event, value) => setCurrentPage(value);

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
    <Container maxWidth="lg">
      <CssBaseline />
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight={600} color="primary">Discover Authors</Typography>
        <Box display="flex" justifyContent="center" my={2}>
          <TextField
            variant="outlined"
            placeholder="Search Authors..."
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
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {displayedAuthors.map((author) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  '&:hover': { boxShadow: 6 },
                }}
              >
                <Avatar sx={{ width: 80, height: 80, bgcolor: "#277da1", mx: "auto",fontSize:'30px' }}>
                  {author.firstName?.[0]}
                </Avatar>
                <Typography variant="h6" mt={2} color="#1b4965" fontWeight={600}>{`${author.firstName} ${author.lastName}`}</Typography>
                <Box display="flex" justifyContent="center" mt={1}>
                  <Favorite sx={{ color: "#ff758f", mr: 1 }} />
                  <Typography>{author.numLikes || 0}</Typography>
                  <ModeComment sx={{ color: "#2196F3", ml: 2, mr: 1 }} />
                  <Typography>{author.numComments || 0}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => navigate(`/authordetails/${author.id}`)}
                >
                  View Details
                </Button>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Pagination count={Math.ceil(filteredAuthors.length / cardPerPage)} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Container>
  );
}
