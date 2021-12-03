import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const renderHistCell = (params) => {
    if (params.value > 0) {
      return (
        <span style={{ color: "lightgreen" }}>
          + {Intl.NumberFormat().format(params.value)}
        </span>
      );
    } else if (params.value < 0) {
      return (
        <span style={{ color: "lightcoral" }}>
          - {Intl.NumberFormat().format(params.value * -1)}
        </span>
      );
    } else {
      return (
        <span style={{ color: "khaki" }}>
          {Intl.NumberFormat().format(params.value)}
        </span>
      );
    }
  };

export const countryVaxCols: GridColDef[] = [
    {
        field: "country",
        headerName: "Country",
        flex: 1,
    },
    {
        field: "total",
        headerName: "Total",
        flex: 1,
        type: "number",
        valueGetter: (params) => params.row.timeline[1].total
    },
    { 
        field: "totalHist",
        headerName: "Total (2 Day)",
        flex: 1,
        valueGetter: (params) => params.row.timeline[1].total - params.row.timeline[0].total,
        renderCell: renderHistCell
    },
    {
        field: "daily",
        headerName: "Daily",
        flex: 1,
        type: "number",
        valueGetter: (params) => params.row.timeline[1].daily
    },
    { 
        field: "dailyHist",
        headerName: "Daily (2 Day)",
        flex: 1,
        valueGetter: (params) => params.row.timeline[1].daily - params.row.timeline[0].daily,
        renderCell: renderHistCell
    }
];

export const stateVaxCols: GridColDef[] = [
    {
        field: "state",
        headerName: "State",
        flex: 1,
    },
    {
        field: "total",
        headerName: "Total",
        flex: 1,
        type: "number",
        valueGetter: (params) => params.row.timeline[1].total
    },
    { 
        field: "totalHist",
        headerName: "Total (2 Day)",
        flex: 1,
        valueGetter: (params) => params.row.timeline[1].total - params.row.timeline[0].total,
        renderCell: renderHistCell
    },
    {
        field: "daily",
        headerName: "Daily",
        flex: 1,
        type: "number",
        valueGetter: (params) => params.row.timeline[1].daily
    },
    { 
        field: "dailyHist",
        headerName: "Daily (2 Day)",
        flex: 1,
        valueGetter: (params) => params.row.timeline[1].daily - params.row.timeline[0].daily,
        renderCell: renderHistCell
    }
];