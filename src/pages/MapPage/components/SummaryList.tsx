import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function SummaryList({ data, loading, columns }) {
  return (
    <React.Fragment>
      <Grid item xs={12} style={{ width: "100%", height: "100%" }}>
        <DataGrid
          sortModel={[{ field: "value", sort: "desc" }]}
          columns={columns}
          rows={data}
          loading={loading}
          style={{ width: "100%", height: "100%" }}
          hideFooter
          density="compact"
        />
      </Grid>
    </React.Fragment>
  );
}

export default SummaryList;
