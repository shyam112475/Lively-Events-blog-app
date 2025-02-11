import { Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a5276, #247ba0)",
          color: "#fff",
          py: 3,
          textAlign: "center",
          mt: "auto",
          marginTop: "40px",
          borderTop: "2px solid #b0c4b1",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: "500" }}>
          Built by <br />
          <Link
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener"
            sx={{
              color: "#b0c4b1",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "color 0.3s ease-in-out",
              "&:hover": { color: "#d4e157" },
            }}
          >
            Shyam Rajput
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Footer;
