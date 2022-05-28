import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function NotFoundPage() {
  return (
    <div>
      <Paper variant="outlined" square>
        <Box p={3} m={2} height={400}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </Box>
      </Paper>
    </div>
  );
}

export default NotFoundPage;
