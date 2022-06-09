import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableFooter, TableHeader } from "../../../DataTable/DataTable";

const styling = {
  dataGrid: {
    height: "600px",
  },
};

function TotalsTable({ data, cols, loading, sortModel, source , filterModel}) {
  const [sort, setSort] = useState<any>(sortModel);
  return (
    <React.Fragment>
      <DataGrid
        rows={data}
        columns={cols}
        loading={loading}
        style={styling.dataGrid}
        sortModel={sort}
        filterModel={filterModel}
        onSortModelChange={(model) => setSort(model)}
        components={{
          Footer: TableFooter,
        }}
        componentsProps={{
          footer: {
            sourceName: source.name,
            sourceUrl: source.url,
          },
        }}
      />
    </React.Fragment>
  );
}

export default TotalsTable;