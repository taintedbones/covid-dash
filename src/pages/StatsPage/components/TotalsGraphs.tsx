import React from "react";
import LineGraph from "../../../Graphs/LineGraph";
import { Grid } from "@mui/material";

function ToolsGraphs({ confirmed, deaths, recovered }) {
  return (
    <React.Fragment>
      <Grid item container xs={12}>
        <Grid item container xs>
          <LineGraph title="Total Confirmed Cases" data={confirmed} />
        </Grid>
        <Grid item container xs>
          <LineGraph title="Total Deaths" data={deaths} />
        </Grid>
        <Grid item container xs>
          <LineGraph title="Total Recovered" data={recovered} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ToolsGraphs;