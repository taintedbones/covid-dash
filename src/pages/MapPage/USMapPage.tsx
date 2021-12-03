import React, { useEffect, useState } from "react";
import MapPage from "./MapPage";
import { State, StateMapItem, Country } from "../../scripts/DataInterfaces";
import { getUSFlag } from "../../scripts/USFlagMatch";
import feats from "./MapFeatures/us_states_albers.json";
import axios from "axios";

function USMapPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<String>("cases");
  const [title, setTitle] = useState<string>("Confirmed Cases");
  const [data, setData] = useState<StateMapItem[]>([]);
  const [totals, setTotals] = useState<Country>();
  const [states, setStates] = useState<State[]>([]);
  const [confirmedCases, setConfirmedCases] = useState<StateMapItem[]>([]);
  const [activeCases, setActiveCases] = useState<StateMapItem[]>([]);
  const [recoveredCases, setRecoveredCases] = useState<StateMapItem[]>([]);
  const [deathsCases, setDeathsCases] = useState<StateMapItem[]>([]);

  const columns = [
    {
      field: "flag",
      headerName: "",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.flag;
      },
      renderCell: (params) => {
        return <img src={params.row.flag} alt="" height="20px" />;
      },
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Total",
      flex: 1,
      type: "number",
    },
  ];

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/states");
        const temp: any[] = r.data;
        const stateList: State[] = temp.map((state, idx) => ({
            ...state,
            id: idx,
            flag: getUSFlag(state.state),
          }
        ));

        setData(
          stateList.map((state: any) => ({
            id: state.state,
            value: state.cases,
            state: state.state,
            flag: state.flag
          }))
        );
        setConfirmedCases(
          stateList.map((state: any) => ({
            id: state.state,
            value: state.cases,
            state: state.state,
            flag: state.flag
          }))
        );
        setActiveCases(
          stateList.map((state: any) => ({
            id: state.state,
            value: state.active,
            state: state.state,
            flag: state.flag
          }))
        );
        setRecoveredCases(
          stateList.map((state: any) => ({
            id: state.state,
            value: state.recovered,
            state: state.state,
            flag: state.flag
          }))
        );
        setDeathsCases(
          stateList.map((state: any) => ({
            id: state.state,
            value: state.deaths,
            state: state.state,
            flag: state.flag
          }))
        );

        setStates(stateList);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTotals = async () => {
      setLoading(true);
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/countries/USA?strict=true"
        );
        const totalItem: Country = r.data;

        setTotals(totalItem);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (states.length === 0) {
      fetchStates();
    }
    if (!totals) {
      fetchTotals();
    }
  }, []);

  useEffect(() => {
    if (view === "cases") {
      setTitle("Confirmed Cases");
      setData(confirmedCases);
    } else if (view === "active") {
      setTitle("Active Cases");
      setData(activeCases);
    } else if (view === "recovered") {
      setTitle("Recovered Cases");
      setData(recoveredCases);
    } else if (view === "deaths") {
      setTitle("Deaths");
      setData(deathsCases);
    }
  }, [view]);

  return (
    <div>
      <MapPage
        totals={totals}
        view={view}
        setView={setView}
        title={title}
        data={data}
        loading={loading}
        cols={columns}
        mapConfig={{
          proj: {
            min: 350,
            max: 600,
          },
          y: 0.5,
          features: feats.features,
          label: "properties.state_name",
          colors: "YlOrRd",
          // borderColor: "#000000"
        }}
      />
    </div>
  );
}

export default USMapPage;
