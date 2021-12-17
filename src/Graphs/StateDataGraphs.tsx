import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import LineGraph from "./LineGraph";
import { parseData } from "./parseData";
import axios from "axios";

function StateDataGraph({state}){
    const [cases, setCases] = useState<any[]>([]);
    const [deaths, setDeaths] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchStateHistory = async () => {
          setLoading(true);
        try {
          const r = await axios.get(
            "https://disease.sh/v3/covid-19/historical/usacounties/" +
            state.toLowerCase() +
              "?lastdays=10"
          );
          console.log(r.data);
  
          setCases([{ id: "Cases", data: parseData(r.data.timeline.cases) }]);
          setDeaths([{ id: "Deaths", data: parseData(r.data.timeline.deaths) }]);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      if (state !== "All") {
        fetchStateHistory();
      }
    }, [state]);
  
    return (
      <React.Fragment>
        <Grid item container xs={6} justifyContent="center">
          <LineGraph title={"Total Cases"} data={cases} />
        </Grid>
        <Grid item container xs={6} justifyContent="center">
          {loading ? <CircularProgress /> : <LineGraph title={"Total Deaths"} data={deaths} />}
        </Grid>
      </React.Fragment>
    );
}

export default StateDataGraph;