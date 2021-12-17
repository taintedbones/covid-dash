import {
  Grid,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MapChart from "./components/MapChart";
import SummaryList from "./components/SummaryList";
import TotalCard from "./components/TotalCard";

function MapPage({
  totals,
  view,
  setView,
  title,
  data,
  loading,
  cols,
  mapConfig,
}) {
  return (
    <div>
      <Grid item container spacing={2} justifyContent="space-evenly">
        {totals && <Grid item xs={12}>Updated: {new Date(totals.updated).toUTCString()}</Grid>}
        {totals && (
          <Grid
            item
            container
            className="totalsContainer"
            xs={12}
            spacing={2}
            justifyContent="space-evenly"
          >
            <TotalCard
              title="Total Cases"
              value={totals.cases}
              color="lightblue"
              gridWidth={3}
            />
            <TotalCard
              title="Total Recoveries"
              value={totals.recovered}
              color="lightgreen"
              gridWidth={3}
            />
            <TotalCard
              title="Total Deaths"
              value={totals.deaths}
              color="lightcoral"
              gridWidth={3}
            />
            <TotalCard
              title="Total Tests"
              value={totals.tests}
              color="khaki"
              gridWidth={3}
            />
          </Grid>
        )}
        <Grid item xs={3}>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, value) => setView(value)}
          >
            <ToggleButton value="cases">Confirmed</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="recovered">Recovered</ToggleButton>
            <ToggleButton value="deaths">Deaths</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={3} style={{ width: "100%", height: "680px" }}>
          <Paper style={{ height: "100%" }}>
            <SummaryList data={data} loading={loading} columns={cols} />
          </Paper>
        </Grid>
        <Grid item container xs={9} spacing={2}>
          <MapChart data={data} mapConfig={mapConfig} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MapPage;
