import React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ minHeight: 30, height: 30, background: "#FFF" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <EmailIcon fontSize="small" style={{ color: "#000" }} />
          <Typography sx={{ marginLeft: 1, fontSize: "0.8rem", color: "#000" }}>
            dirit-hp@nic.in
          </Typography>

          <PhoneIcon
            fontSize="small"
            style={{ marginLeft: 50, color: "#000" }}
          />
          <Typography
            sx={{
              marginLeft: 1,
              fontSize: "0.8rem",
              marginRight: 5,
              color: "#000",
            }}
          >
            +91 1772628914
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
