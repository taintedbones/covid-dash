import React, { useState } from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TableFooter } from "../../../DataTable/DataTable";

function SummaryList({ data, loading, columns }) {
  const [sortModel, setSortModel] = useState<any[]>([
    { field: "value", sort: "desc" },
  ]);
  return (
    <React.Fragment>
      <Grid item xs={12} style={{ width: "100%", height: "100%" }}>
        <DataGrid
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          columns={columns}
          rows={data}
          loading={loading}
          style={{ width: "100%", height: "100%" }}
          density="compact"
          components={{
            Footer: TableFooter,
          }}
          componentsProps={{
            footer: {
              sourceName: "Worldometers",
              sourceUrl: "https://www.worldometers.info/coronavirus/",
            },
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SummaryList;
