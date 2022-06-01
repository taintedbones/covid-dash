import { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TotalCard from "../MapPage/components/TotalCard";
import MapChart from "../MapPage/components/MapChart";
import LineGraph from "../../Graphs/LineGraph";
import { TableFooter } from "../../DataTable/DataTable";

function VaccinesPage({
  totals,
  tableCols,
  tableData,
  mapData,
  timeline,
  mapConfig,
}) {
  const [sortModel, setSortModel] = useState<any[]>([
    { field: "total", sort: "desc" },
  ]);
  const date = new Date();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Updated: {date.toUTCString()}</Typography>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          {totals && (
            <Grid item container xs={12} md={3} spacing={2} sx={{ height: "170px" }}>
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
            </Grid>
          )}
          <Grid item container xs={12} md={9}>
            <MapChart data={mapData} mapConfig={mapConfig} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <DataGrid
            rows={tableData}
            columns={tableCols}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            components={{
              Footer: TableFooter,
            }}
            componentsProps={{
              footer: {
                sourceName: "RAPS",
                sourceUrl:
                  "https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker",
              },
            }}
          />
        </Grid>
        <Grid item container xs={12} md={5}>
          <LineGraph
            title="Total Administered"
            data={timeline}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default VaccinesPage;
