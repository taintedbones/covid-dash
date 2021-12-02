import { GridColDef } from "@mui/x-data-grid";

export const confirmedCols: GridColDef[] = [
  {
    field: "flag",
    headerName: "",
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.countryInfo.flag;
    },
    renderCell: (params) => {
      return (
        <img
          src={params.row.countryInfo.flag}
          alt=""
          style={{ height: "20px" }}
        />
      );
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "cases",
    headerName: "Total",
    flex: 1,
  },
];

export const activeCols: GridColDef[] = [
  {
    field: "flag",
    headerName: "",
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.countryInfo.flag;
    },
    renderCell: (params) => {
      return (
        <img
          src={params.row.countryInfo.flag}
          alt=""
          style={{ height: "20px" }}
        />
      );
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "active",
    headerName: "Total",
    flex: 1,
  },
];

export const recoveredCols: GridColDef[] = [
  {
    field: "flag",
    headerName: "",
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.countryInfo.flag;
    },
    renderCell: (params) => {
      return (
        <img
          src={params.row.countryInfo.flag}
          alt=""
          style={{ height: "20px" }}
        />
      );
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "recovered",
    headerName: "Total",
    flex: 1,
  },
];

export const deathsCols: GridColDef[] = [
  {
    field: "flag",
    headerName: "",
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.countryInfo.flag;
    },
    renderCell: (params) => {
      return (
        <img
          src={params.row.countryInfo.flag}
          alt=""
          style={{ height: "20px" }}
        />
      );
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "deaths",
    headerName: "Total",
    flex: 1,
  },
];
