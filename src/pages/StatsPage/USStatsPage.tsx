import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { State, County } from "../../scripts/DataInterfaces";
import { stateTotalCols, statePopCols, countyCols } from "./StatsCols";
import { getUSFlag } from "../../scripts/USFlagMatch";
import TotalCard from "../MapPage/components/TotalCard";
import USDataGraph from "../../Graphs/USDataGraph";
import { TableFooter, TableHeader } from "../../DataTable/DataTable";
import TotalsTable from "./components/Table";
import axios from "axios";

const styling = {
  dataGrid: {
    height: "600px",
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
  // const [data, setData] = useState<State[] | County[]>([]);
  const [data, setData] = useState<any>([]);
  const [cols, setCols] = useState<any>(stateTotalCols);
  const [stateNames, setStateNames] = useState<string[]>([]);
  const [filterModel, setFilterModel] = useState<any>({
    items: [],
  });
  const [sortModel, setSortModel] = useState<any>([
    { field: "cases", sort: "desc" },
  ]);
  const [dataPerPop, setDataPerPop] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>({
    name: "Worldometers",
    url: "https://www.worldometers.info/coronavirus/",
  });
  const [disableDataSelect, setDisableDataSelect] = useState<boolean>(false);
  const [cntysFetched, setCntysFetched] = useState<string[]>([]);

  useEffect(() => {
    const fetchState = async () => {
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
              casesPerOneMillion: hist?.casesPerOneMillion,
              deathsPerOneMillion: hist?.deathsPerOneMillion,
              testsPerOneMillion: hist?.testsPerOneMillion,
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
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/jhucsse/counties"
        );
        const temp: any[] = r.data;
        const counties: County[] = temp.map((county, idx) => ({
          ...county,
          hist: {
            confirmed: null,
            deaths: null,
          },
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
      } catch (error) {
        console.error(error);
      }
    };

    // check time to only update table every 10 minutes
    const time = new Date();
    // TODO: Figure out a fix for this
    // currently doesn't update table every 10 minutes
    if (stateList.length === 0 || time.getMinutes() % 10 === 0) {
      setLoading(true);
      fetchState();
      fetchCounties();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCountiesHistory = async (stateName) => {
      setLoading(true);
      try {
        // API only allows getting one state at a time
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/historical/usacounties/" +
            stateName.toLowerCase() +
            "?lastdays=2"
        );

        let temp = countyList.slice();

        r.data.forEach((item) => {
          const idx = temp.findIndex(
            (cnty) => cnty.county.toLowerCase() === item.county
          );

          if (idx !== -1) {
            const confirmed = Object.values(item.timeline.cases)[0];
            const deaths = Object.values(item.timeline.deaths)[0];

            temp[idx].hist = {
              confirmed: Number(confirmed),
              deaths: Number(deaths),
            };
          }
        });

        let ctyFetchList = cntysFetched.slice();
        ctyFetchList.push(stateName);

        setCntysFetched(ctyFetchList);
        setCountyList(temp);
        setData(temp);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    // TODO: Cases & deaths on state totals not displaying on table when
    //  switching from specified state back to all
    if (stateName === "All") {
      setState(undefined);
      // setCols(stateTotalCols);
      // setData(stateList);
      // setDataSource({
      //   name: "Worldometers",
      //   url: "https://www.worldometers.info/coronavirus/",
      // });
      // setFilterModel({
      //   items: [],
      // });
      setDisableDataSelect(false);
    } else {
      setData([]);
      if (!cntysFetched.find((i) => i === stateName)) {
        fetchCountiesHistory(stateName);
      } else {
        setData(countyList);
      }
      // setCols(countyCols);
      setState(stateList.find((item) => item.state === stateName));
      // setDataSource({
      //   name: "John Hopkins University",
      //   url: "https://coronavirus.jhu.edu/",
      // });
      // setFilterModel({
      //   items: [
      //     {
      //       columnField: "province",
      //       operatorValue: "equals",
      //       value: stateName,
      //     },
      //   ],
      // });
      setDisableDataSelect(true);
    }
  }, [stateName]);

  useEffect(() => {
    if (dataPerPop) {
      setCols(statePopCols);
    } else {
      setCols(stateTotalCols);
    }
  }, [dataPerPop]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} justifyContent="space-between">
          <Grid item container xs={12} md={4}>
            <TableHeader
              setShowPop={setDataPerPop}
              disabled={disableDataSelect}
            />
            <Select
              value={stateName}
              label="Select State"
              sx={styling.select}
              onChange={(event) => setStateName(event.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {stateNames &&
                stateNames.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          {state && (
            <Grid
              item
              container
              xs={12}
              md={8}
              spacing={2}
              justifyContent="flex-end"
            >
              <Grid item xs={12} md={3} style={{ height: "auto" }}>
                <Paper
                  style={styling.paper}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={state?.flag} alt="" height="85px" />
                </Paper>
              </Grid>
              <TotalCard
                title="Total Cases"
                value={state?.cases}
                color="lightblue"
                gridWidth={3}
              />
              <TotalCard
                title="Total Deaths"
                value={state?.deaths}
                color="lightcoral"
                gridWidth={3}
              />
              <TotalCard
                title="Total Recoveries"
                value={state?.recovered}
                color="lightgreen"
                gridWidth={3}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          {stateName === "All" ? (
            <TotalsTable
              data={stateList}
              cols={stateTotalCols}
              loading={loading}
              sortModel={[{ field: "cases", sort: "desc" }]}
              filterModel={{ items: [] }}
              source={{
                name: "Worldometers",
                url: "https://www.worldometers.info/coronavirus/",
              }}
            />
          ) : (
            <TotalsTable
              data={countyList}
              cols={countyCols}
              loading={loading}
              sortModel={[{ field: "cases", sort: "desc" }]}
              filterModel={{
                items: [
                  {
                    columnField: "province",
                    operatorValue: "equals",
                    value: stateName,
                  },
                ],
              }}
              source={{
                name: "John Hopkins University",
                url: "https://coronavirus.jhu.edu/",
              }}
            />
          )}
        </Grid>
        {stateName === "All" && <USDataGraph />}
      </Grid>
    </div>
  );
}

export default USStatsPage;
