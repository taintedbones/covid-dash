import React, { useState, useEffect } from "react";
import { Grid} from "@mui/material";
import LineGraph from "./LineGraph";
import axios from "axios";

function USDataGraph() {
    const [cases, setCases] = useState<any[]>([]);
    const [deaths, setDeaths] = useState<any[]>([]);

    useEffect(() => {
        const parseData = (input) => {
          const dates: any = Object.keys(input);
          const values: any = Object.values(input);
    
          const stats = dates.map((item, idx) => ({
            x: item,
            y: values[idx] / 1000000,
          }));
    
          return stats;
        };
    
        const fetchUSHistory = async () => {
          try {
            const r = await axios.get(
              "https://disease.sh/v3/covid-19/historical/USA?lastdays=10"
            );
            const temp: any[] = r.data;
    
            setCases([{ id: "Cases", data: parseData(r.data.timeline.cases) }]);
            setDeaths([{ id: "Deaths", data: parseData(r.data.timeline.deaths) }]);
            // setRecovered([{id: "Recovered", data: parseData(r.data.recovered)}]);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchUSHistory();
      }, []);
    
      return (
        <React.Fragment>
          <Grid item container xs={6} justifyContent="center">
            <LineGraph title={"Total Cases"} data={cases} />
          </Grid>
          <Grid item container xs={6} justifyContent="center">
            <LineGraph title={"Total Deaths"} data={deaths} />
          </Grid>
        </React.Fragment>
      );
}

export default USDataGraph;