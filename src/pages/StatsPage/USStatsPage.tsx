import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Typography, Select, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { State, County } from "../../scripts/DataInterfaces";
import { stateCols, countyCols } from "./StatsCols";
import { getUSFlag } from "../../scripts/USFlagMatch";
import TotalCard from "../MapPage/components/TotalCard";
import USDataGraph from "../../Graphs/USDataGraph";
import axios from "axios";

const styling = {
  dataGrid: {
    height: "700px",
  },
  select: {
    width: "100%",
    color: "white",
  },
  paper: {
    padding: "10px",
    height: "100%",
  },
};

function USStatsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [stateList, setStateList] = useState<State[]>([]);
  const [countyList, setCountyList] = useState<County[]>([]);
  const [stateName, setStateName] = useState<string>("All");
  const [state, setState] = useState<State>();
  const [data, setData] = useState<State[] | County[]>([]);
  const [cols, setCols] = useState<any>(stateCols);
  const [stateNames, setStateNames] = useState<string[]>([]);
  const [filterModel, setFilterModel] = useState<any>({
    items: [],
  });
  const [sortModel, setSortModel] = useState<any>([{ field: "cases", sort: "desc" }]);

  useEffect(() => {
    const fetchState = async () => {
      setLoading(true);
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/states?sort=cases&allowNull=true"
        );
        const temp: any[] = r.data;
        const states: State[] = temp.map((state, idx) => ({
          ...state,
          id: idx,
          flag: getUSFlag(state.state),
        }));

        let names: string[] = [];
        states.forEach((item) => names.push(item.state));

        fetchStatesHistory(states);
        setStateNames(names);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchStatesHistory = async (states) => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/states?sort=cases&yesterday=true&allowNull=true"
        );
        const stateHist = r.data;
        const temp = states.map((state) => {
          const hist: any = stateHist.find((i) => i.state === state.state);

          return {
            ...state,
            hist: {
              active: hist?.active,
              cases: hist?.cases,
              deaths: hist?.deaths,
              recovered: hist?.recovered,
            },
          };
        });
        setData(temp);
        setStateList(temp);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCounties = async () => {
      setLoading(true);
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/jhucsse/counties"
        );
        const temp: any[] = r.data;
        const counties: County[] = temp.map((county, idx) => ({
          ...county,
          id: idx,
        }));

        let names: string[] = [];

        counties.forEach((item: County) => {
          if (!names.find((name) => name === item.province)) {
            names.push(item.province);
          }
        });

        setStateNames(names);
        setCountyList(counties);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (stateList.length === 0) {
      fetchState();
      fetchCounties();
    }
  }, []);

  useEffect(() => {
    if (stateName === "All") {
      setState(undefined);
      setData(stateList);
      setCols(stateCols);
      setFilterModel({
        items: [],
      });
    } else {
      setState(stateList.find((item) => item.state === stateName));
      setData(countyList);
      setCols(countyCols);
      setFilterModel({
        items: [
          {
            columnField: "province",
            operatorValue: "equals",
            value: stateName,
          },
        ],
      });
    }
  }, [stateName]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} justifyContent="space-between">
          <Grid item container xs={4}>
            <Typography variant="h4">US Statistics</Typography>
            <Select
              value={stateName}
              label="Select State"
              sx={styling.select}
              onChange={(event) => setStateName(event.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {stateNames &&
                stateNames.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </Grid>
          {state && (
            <Grid item container xs={8} spacing={2} justifyContent="flex-end">
              <Grid item xs={3} style={{ height: "120px" }}>
                <Paper style={styling.paper}>
                  <img src={state?.flag} alt="" height="80px" />
                </Paper>
              </Grid>
              <TotalCard
                title="Total Cases"
                value={state?.cases}
                color="lightblue"
              />
              <TotalCard
                title="Total Deaths"
                value={state?.deaths}
                color="lightcoral"
              />
              <TotalCard
                title="Total Recoveries"
                value={state?.recovered}
                color="lightgreen"
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={data}
            columns={cols}
            loading={loading}
            style={styling.dataGrid}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            filterModel={filterModel}
          />
        </Grid>
        {stateName === "All" && <USDataGraph />}
      </Grid>
    </div>
  );
}

export default USStatsPage;
