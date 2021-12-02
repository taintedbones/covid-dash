import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

function TotalCard({title, value, color}) {
    return(
        <React.Fragment>
            <Grid item xs={3} sx={{height: "100%"}}>
              <Paper style={{padding: "5px", height: "100%"}}>
                <Typography
                  align="center"
                  variant="h6"
                  style={{ color: color }}
                >
                  {title}
                </Typography>
                <Typography
                  align="center"
                  variant="h4"
                  style={{ color: color }}
                >
                  {Intl.NumberFormat().format(value)}
                </Typography>
              </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default TotalCard;