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

export const countryCols: GridColDef[] = [
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
    sortable: false,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
    type: "number",
  },
  {
    field: "activeHist",
    headerName: "Active (2 Day)",
    flex: 1,
    valueGetter: (params) => params.row.active - params.row.twoDayHist.active,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "cases",
    headerName: "Confirmed",
    flex: 1,
    type: "number",
  },
  {
    field: "casesHist",
    headerName: "Confirmed (2 Day)",
    flex: 1,
    valueGetter: (params) => params.row.cases - params.row.twoDayHist.cases,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "recovered",
    headerName: "Recovered",
    flex: 1,
    type: "number",
  },
  {
    field: "recoveredHist",
    headerName: "Recovered (2 Day)",
    flex: 1,
    valueGetter: (params) =>
      params.row.recovered - params.row.twoDayHist.recovered,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "deaths",
    headerName: "Deaths",
    flex: 1,
    type: "number",
  },
  {
    field: "deathsHist",
    headerName: "Deaths (2 Day)",
    flex: 1,
    valueGetter: (params) => params.row.deaths - params.row.twoDayHist.deaths,
    renderCell: renderHistCell,
    sortable: false,
  },
  // {
  //   field: "tests",
  //   headerName: "Tests",
  //   flex: 1,
  //   type: "number",
  // },
  {
    field: "updated",
    headerName: "Last Updated",
    flex: 1.5,
    valueGetter: (params) => new Date(params.value).toLocaleString(),
  },
];

export const provinceCols: GridColDef[] = [
  {
    field: "country",
    headerName: "Country",
    flex: 1,
    hide: true,
  },
  {
    field: "province",
    headerName: "Province",
    flex: 1,
  },
  {
    field: "cases",
    headerName: "Confirmed",
    flex: 1,
    type: "number",
    valueGetter: (params) => params.row.stats.confirmed,
  },
  {
    field: "casesHist",
    headerName: "Confirmed (2 Day)",
    flex: 1,
    valueGetter: (params) => {
      if (params.row.stats.confirmed && params.row.twoDayHist.confirmed) {
        return params.row.stats.confirmed - params.row.twoDayHist.confirmed;
      }
    },
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "deaths",
    headerName: "Deaths",
    flex: 1,
    type: "number",
    valueGetter: (params) => params.row.stats.deaths,
  },
  {
    field: "deathsHist",
    headerName: "Deaths (2 Day)",
    flex: 1,
    valueGetter: (params) => {
      if (params.row.stats.deaths && params.row.twoDayHist.deaths) {
        return params.row.stats.deaths - params.row.twoDayHist.deaths;
      }
    },
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "recovered",
    headerName: "Recovered",
    flex: 1,
    type: "number",
    valueGetter: (params) => params.row.stats.recovered,
  },
  {
    field: "recoveredHist",
    headerName: "Recovered (2 Day)",
    flex: 1,
    valueGetter: (params) => {
      if (params.row.stats.recovered && params.row.twoDayHist.recovered) {
        return params.row.stats.recovered - params.row.twoDayHist.recovered;
      }
    },
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "updatedAt",
    headerName: "Confirmed",
    flex: 1,
    type: "Date",
  },
];

export const stateCols: GridColDef[] = [
  {
    field: "flag",
    headerName: "",
    flex: 0.5,
    valueGetter: (params) => {
      return params.row.flag;
    },
    renderCell: (params) => {
      return <img src={params.row.flag} alt="" style={{ height: "20px" }} />;
    },
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
    type: "number",
  },
  {
    field: "activeHist",
    headerName: "Active (1 Day)",
    flex: 1,
    valueGetter: (params) => params.row.active - params.row.hist.active,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "cases",
    headerName: "Cases",
    flex: 1,
    type: "number",
  },
  {
    field: "casesHist",
    headerName: "Confirmed (1 Day)",
    flex: 1,
    valueGetter: (params) => params.row.cases - params.row.hist.cases,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "recovered",
    headerName: "Recovered",
    flex: 1,
    type: "number",
  },
  {
    field: "recoveredHist",
    headerName: "Recovered (1 Day)",
    flex: 1,
    valueGetter: (params) => params.row.recovered - params.row.hist.recovered,
    renderCell: renderHistCell,
    sortable: false,
  },
  {
    field: "deaths",
    headerName: "Deaths",
    flex: 1,
    type: "number",
  },
  {
    field: "deathsHist",
    headerName: "Deaths (1 Day)",
    flex: 1,
    valueGetter: (params) => params.row.deaths - params.row.hist.deaths,
    renderCell: renderHistCell,
    sortable: false,
  },
  // {
  //   field: "tests",
  //   headerName: "Tests",
  //   flex: 1,
  //   type: "number",
  // },
  {
    field: "updated",
    headerName: "Last Updated",
    flex: 1.5,
    valueGetter: (params) => new Date(params.value).toLocaleString(),
  },
];

export const countyCols: GridColDef[] = [
  {
    field: "province",
    flex: 1,
    hide: true,
  },
  {
    field: "county",
    headerName: "County",
    flex: 1,
  },
  {
    field: "cases",
    headerName: "Cases",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.stats.confirmed,
  },
  {
    field: "deaths",
    headerName: "Deaths",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.stats.deaths,
  },
  {
    field: "recovered",
    headerName: "Recovered",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.stats.recovered,
  },
  {
    field: "updatedAt",
    headerName: "Last Updated",
    flex: 1,
  },
];
