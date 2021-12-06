import React from "react";
import { Grid, Paper, Typography } from "@mui/material";


function TotalCard({ title, value, color, gridWidth }) {
  return (
    <React.Fragment>
      <Grid item container xs={gridWidth}>
        <Paper sx={{ padding: "5px", height: "100%", width: "100%" }}>
          <Grid item container xs={12} alignItems="center" sx={{height: "100px"}}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6" style={{ color: color }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h4" style={{ color: color }}>
                {Intl.NumberFormat().format(value)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default TotalCard;
