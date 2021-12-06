import React from "react";
import { AppBar, Typography } from "@mui/material";

function AppFooter() {
  return (
    <div>
      <AppBar
        sx={{ top: "auto", bottom: 0, height: "50px", paddingTop: "15px" }}
      >
        <Typography variant="button" align="center">
          Created by Kierstyn Just
        </Typography>
      </AppBar>
    </div>
  );
}

export default AppFooter;
