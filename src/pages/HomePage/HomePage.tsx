import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { DataTotal } from "../../scripts/DataInterfaces";
import TotalCard from "../MapPage/components/TotalCard";
import { MdOutlineCoronavirus } from "react-icons/md";
import axios from "axios";
import "../../App.css";

function HomePage() {
  const [totals, setTotals] = useState<DataTotal>();

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/all?allowNull=true"
        );
        setTotals(r.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotals();
  }, []);

  const resourceButton = (text, url) => (
    <Link href={url} target="_blank" rel="noopener">
      <Button variant="contained" sx={{ width: "100%", height: "100px" }}>
        <Typography variant="h6">{text}</Typography>
      </Button>
    </Link>
  );

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h1" sx={{ display: "inline-flex" }}>
              C<MdOutlineCoronavirus className="App-logo" />
              VID-19 Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              Track the current pandemic with live data
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2} justifyContent="center">
          <TotalCard
            title="Cases Today"
            value={totals?.todayCases}
            color="khaki"
            gridWidth={4}
          />
          <TotalCard
            title="Deaths Today"
            value={totals?.todayDeaths}
            color="lightcoral"
            gridWidth={4}
          />
          <TotalCard
            title="Recovered Today"
            value={totals?.todayRecovered}
            color="lightgreen"
            gridWidth={4}
          />
          <TotalCard
            title="Total Cases"
            value={totals?.cases}
            color="khaki"
            gridWidth={4}
          />
          <TotalCard
            title="Total Deaths"
            value={totals?.deaths}
            color="lightcoral"
            gridWidth={4}
          />
          <TotalCard
            title="Total Recovered"
            value={totals?.recovered}
            color="lightgreen"
            gridWidth={4}
          />
        </Grid>
        <Grid item container xs={12} spacing={4}>
          <Grid item container xs={6} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                COVID-19 Resources
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {resourceButton(
                "About COVID-19 (CDC.gov)",
                "https://www.cdc.gov/coronavirus/2019-ncov/your-health/about-covid-19/basics-covid-19.html"
              )}
            </Grid>
            <Grid item xs={6}>
              {resourceButton(
                "Testing for COVID-19 (CDC.gov)",
                "https://www.cdc.gov/coronavirus/2019-ncov/testing/index.html"
              )}
            </Grid>
            <Grid item xs={6}>
              {resourceButton(
                "Vaccines for COVID-19 (CDC.gov)",
                "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html"
              )}
            </Grid>
            <Grid item xs={6}>
              {resourceButton(
                "Find COVID-19 Vaccines & Boosters (US)",
                "https://www.vaccines.gov/"
              )}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Data Resources
            </Typography>
            <Typography>
              This website uses the{" "}
              <Link href="https://github.com/disease-sh/API">disease.sh</Link>{" "}
              API to pull data every 10 minutes from the following sources:
              <ul>
                <li>John Hopkins University</li>
                <li>Worldometers</li>
                <li>RAPS</li>
              </ul>
            </Typography>
            <Divider />
            <Typography variant="h5" gutterBottom>
              Disclaimer
            </Typography>
            <Typography>
              Data displayed on this website may not be 100% accurate or missing
              entirely. This can result from a number of reasons including:
              <ul>
                <li>Countries/States not accurately reporting data</li>
                <li>
                  Countries/States not reporting data for large periods of time
                </li>
                <li>Researchers deeming data as unreliable</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
