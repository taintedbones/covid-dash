import { useEffect, useState } from "react";
import MapPage from "./MapPage";
import { Grid } from "@mui/material";
import {
  Country,
  CountryMapItem,
  DataTotal,
} from "../../scripts/DataInterfaces";
import feats from "./MapFeatures/world_countries.json";
import axios from "axios";

function GlobalMapPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [confirmedCases, setConfirmedCases] = useState<CountryMapItem[]>([]);
  const [activeCases, setActiveCases] = useState<CountryMapItem[]>([]);
  const [recoveredCases, setRecoveredCases] = useState<CountryMapItem[]>([]);
  const [deathsCases, setDeathsCases] = useState<CountryMapItem[]>([]);
  const [view, setView] = useState<String>("cases");
  const [title, setTitle] = useState<string>("Confirmed Cases");
  const [data, setData] = useState<CountryMapItem[]>([]);
  const [totals, setTotals] = useState<DataTotal>();
  const [mapDomain, setMapDomain] = useState<number[]>([0,1000000]);

  const columns = [
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
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Total",
      flex: 1,
      type: "number",
    },
  ];

  const getMax = (arr) => {
    let max = 0;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].value > max) {
        max = arr[i].value;
      }
    }
    return max;
  }

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/countries");
        const temp: any[] = r.data;
        const countryList: Country[] = temp.map((country, idx) => ({
          ...country,
          id: idx,
        }));

        setCountries(countryList);

        const tempCountries = countryList.map((country: Country) => ({
          id: country.countryInfo.iso3
            ? country.countryInfo.iso3
            : country.country,
          value: country.cases,
          country: country.country,
          flag: country.countryInfo.flag,
        }));

        setMapDomain([0, getMax(tempCountries)]);
        setData(tempCountries);
        setConfirmedCases(
          countryList.map((country: Country) => ({
            id: country.countryInfo.iso3
              ? country.countryInfo.iso3
              : country.country,
            value: country.cases,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setActiveCases(
          countryList.map((country: Country) => ({
            id: country.countryInfo.iso3
              ? country.countryInfo.iso3
              : country.country,
            value: country.active,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setRecoveredCases(
          countryList.map((country: Country) => ({
            id: country.countryInfo.iso3
              ? country.countryInfo.iso3
              : country.country,
            value: country.recovered,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setDeathsCases(
          countryList.map((country: Country) => ({
            id: country.countryInfo.iso3
              ? country.countryInfo.iso3
              : country.country,
            value: country.deaths,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchTotals = async () => {
      setLoading(true);
      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/all");
        const totalItem: DataTotal = r.data;

        setTotals(totalItem);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (countries.length === 0) {
      fetchCountries();
    }

    if (!totals) {
      fetchTotals();
    }
  }, []);

  useEffect(() => {
    if (view === "cases") {
      setTitle("Confirmed Cases");
      setData(confirmedCases);
      setMapDomain([0, getMax(confirmedCases)]);
    } else if (view === "active") {
      setTitle("Active Cases");
      setData(activeCases);
      setMapDomain([0, getMax(activeCases)]);
    } else if (view === "recovered") {
      setTitle("Recovered Cases");
      setData(recoveredCases);
      setMapDomain([0, getMax(recoveredCases)]);
    } else if (view === "deaths") {
      setTitle("Deaths");
      setData(deathsCases);
      setMapDomain([0, getMax(deathsCases)]);
    }
  }, [view]);

  return (
    <div>
      <Grid container>
        <Grid item>
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
                min: 125,
                max: 600,
              },
              y: 0.63,
              features: feats.features,
              label: "properties.name",
              colors: "YlOrRd",
              domain: mapDomain
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default GlobalMapPage;
