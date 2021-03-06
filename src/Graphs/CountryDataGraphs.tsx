import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import LineGraph from "./LineGraph";
import { parseData } from "./parseData";
import axios from "axios";

function CountryDataGraphs({ country }) {
  const [cases, setCases] = useState<any[]>([]);
  const [deaths, setDeaths] = useState<any[]>([]);

  useEffect(() => {
    const fetchGlobalHistory = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/historical/" +
            country +
            "?lastdays=10"
        );

        setCases([{ id: "Cases", data: parseData(r.data.timeline.cases) }]);
        setDeaths([{ id: "Deaths", data: parseData(r.data.timeline.deaths) }]);
      } catch (err) {
        console.error(err);
      }
    };
    if (country !== "World") {
      fetchGlobalHistory();
    }
  }, [country]);

  return (
    <React.Fragment>
      <Grid item container xs={12} md={6} justifyContent="center">
        <LineGraph title={"Total Cases"} data={cases} />
      </Grid>
      <Grid item container xs={12} md={6} justifyContent="center">
        <LineGraph title={"Total Deaths"} data={deaths} />
      </Grid>
    </React.Fragment>
  );
}

export default CountryDataGraphs;
