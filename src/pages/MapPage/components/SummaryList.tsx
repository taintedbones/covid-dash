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
      <DataGrid
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        columns={columns}
        rows={data}
        loading={loading}
        style={{ width: "100%", height: "95%" }}
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
    </React.Fragment>
  );
}

export default SummaryList;
