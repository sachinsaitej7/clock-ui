import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import MobileOffIcon from "@mui/icons-material/MobileOff";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", padding: "80px 0px" }}>
          <Box sx={{ textAlign: "center" }}>
            <MobileOffIcon fontSize="large" />
            <Typography variant="h4" gutterBottom>
              We are working here!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              You won't find the above message on your desktop, try now !
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
