import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#277da1",
        color: "#fff",
        py: 2,
        textAlign: "center",
        mt: "auto",
        marginTop:'40px'
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
        Built by <br />
        <Link
          href="https://your-portfolio-link.com"
          target="_blank"
          rel="noopener"
          sx={{ color: "#b0c4b1", textDecoration: "none", fontWeight: "bold" }}
        >
            Shyam Rajput
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
