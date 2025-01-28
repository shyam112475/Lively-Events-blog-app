import Avatar from "@mui/material/Avatar";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Data from "../Data";
import { motion } from "framer-motion";

import {
  TextField,
  Button,
  Pagination,
  IconButton,
  Typography,
  Grid2,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authors() {
  const navigate = useNavigate();
  const { auth, error, loading } = Data(`http://localhost:3000/authors`);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 32;
  const start = (currentPage - 1) * cardPerPage;
  const end = start + cardPerPage;
  const authors = auth.slice(start, end);

 

 
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
   console.log(search)
    const lowerCaseQuery = search.toLowerCase();
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(lowerCaseQuery) ||
        author.lastName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  const postsToShow = filteredData.length > 0 ? filteredData : authors;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
        Loading...&#128640 Please Wait .
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
        Error: &#128640 {error.message}
      </p>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container
        style={{ background: "#fff", marginTop: "20px" }}
        maxWidth="lg"
      >
        <Box sx={{ my: 4 }}>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <TextField
              variant="outlined"
              value={search}
              placeholder=" Search Authors ..."
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
          <Grid2 container spacing={5} justifyContent="center">
            {postsToShow.map((author,index) => (
              <Grid2
                item
                xs={16}
                sm={18}
                md={10}
                lg={5}
                key={author.id || Math.random()}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    style={{ background: "#d1e7dd" }}
                    sx={{
                      width: 240,
                      height: 320,
                      p: 3,
                      border: 1,
                      borderRadius: 2,
                      borderColor: "divider",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 4,
                        transform: "scale(1.03)",
                      },
                      transition: "transform 0.3s, box-shadow 0.3s",
                      margin: "auto",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "#277da1",
                        fontSize: 28,
                        mb: 2,
                      }}
                    >
                      {author.firstName?.[0]}
                    </Avatar>
                    <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                      {`${author.firstName} ${author.lastName}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <LocalPhoneIcon sx={{ fontSize: 18, mr: 1 }} />
                      {author.phone || "N/A"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FavoriteIcon
                          sx={{ fontSize: 18, color: "#ff758f", mr: 0.5 }}
                        />
                        <Typography variant="body2">
                          {author.numLikes || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ModeCommentIcon
                          sx={{ fontSize: 18, color: "#2196F3", mr: 0.5 }}
                        />
                        <Typography variant="body2">
                          {author.numComments || 0}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        navigate("/authordetails", {
                          state: {
                            likes: author.numLikes,
                            comments: author.numComments,
                            authorId: author.id,
                            phone: author.phone,
                            firstName: author.firstName,
                            lastName: author.lastName,
                            numPosts:author.numPosts
                          },
                        })
                      }
                      sx={{
                        mt: 3,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          color: "#ff758f",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </motion.div>
              </Grid2>
            ))}
          </Grid2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <IconButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(null, currentPage - 1)}
            ></IconButton>
            <Pagination
              count={32}
              page={currentPage}
              onChange={handlePageChange}
            />
            <IconButton
              disabled={currentPage === 32}
              onClick={() => handlePageChange(null, currentPage + 1)}
            ></IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
