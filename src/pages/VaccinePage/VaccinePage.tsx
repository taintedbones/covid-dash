import React, {useState} from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TotalCard from "../MapPage/components/TotalCard";
import MapChart from "../MapPage/components/MapChart";
import LineGraph from "../../Graphs/LineGraph";

function VaccinesPage({ totals, tableCols, tableData, mapData, timeline, mapConfig }) {
    const [sortModel, setSortModel] = useState<any[]>([{ field: "total", sort: "desc" }]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={2}>
          {totals && (<Grid item container xs={3} spacing={2} sx={{ height: "170px" }}>
            <TotalCard
              title="Total Administered"
              value={totals.total}
              color="lightgreen"
              gridWidth={12}
            />
            <TotalCard
              title="Total Administered (per hundred)"
              value={totals.totalPerHundred}
              color="lightgreen"
              gridWidth={12}
            />
            <TotalCard
              title="Administered Today"
              value={totals.daily}
              color="lightblue"
              gridWidth={12}
            />
            <TotalCard
              title="Administered Today (per million)"
              value={totals.dailyPerMillion}
              color="lightblue"
              gridWidth={12}
            />
          </Grid>)}
          <Grid item container xs={9}>
            <MapChart
              data={mapData}
              mapConfig={mapConfig}
            />
          </Grid>
        </Grid>
        <Grid item xs={7}>
            <DataGrid
            rows={tableData}
            columns={tableCols}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            />
        </Grid>
        <Grid item container xs={5}>
            <LineGraph title="Total Administered (10 Day Period)" data={timeline} />
        </Grid>
      </Grid>
    </div>
  );
}

export default VaccinesPage;
