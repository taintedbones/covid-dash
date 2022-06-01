import { Grid, MenuItem, Select, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Country, CountryJH } from "../../scripts/DataInterfaces";
import { countryTotalCols, countryPopCols, provinceCols } from "./StatsCols";
import TotalCard from "../MapPage/components/TotalCard";
import GlobalDataGraphs from "../../Graphs/GlobalDataGraphs";
import CountryDataGraphs from "../../Graphs/CountryDataGraphs";
import { TableFooter, TableHeader } from "../../DataTable/DataTable";
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
  flagImg: {
    height: "70px",
  },
};

function GlobalStatsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [provinceList, setProvinceList] = useState<CountryJH[]>([]);
  const [countryName, setCountryName] = useState<string>("World");
  const [country, setCountry] = useState<Country | undefined>(undefined);
  // const [data, setData] = useState<Country[] | CountryJH[]>([]);
  const [data, setData] = useState<any>([]);
  const [cols, setCols] = useState<any>(countryTotalCols);
  const [filterModel, setFilterModel] = useState<any>({ items: [] });
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [sortModel, setSortModel] = useState<any>([
    { field: "cases", sort: "desc" },
  ]);
  const [dataPerPop, setDataPerPop] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>({
    name: "Worldometers",
    url: "https://www.worldometers.info/coronavirus/",
  });
  const [disableDataSelect, setDisableDataSelect] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/countries?sort=cases&allowNull=true"
        );
        const temp: any[] = r.data;
        const countries: Country[] = temp.map((country, idx) => ({
          ...country,
          id: idx,
        }));

        fetchCountriesHistory(countries);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchCountriesHistory = async (countries) => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/countries?twoDaysAgo=true&allowNull=true"
        );
        const countriesHist: Country[] = r.data;
        const temp: Country[] = countries.map((country) => {
          const hist: any = countriesHist.find(
            (i: Country) => i.country === country.country
          );

          return {
            ...country,
            twoDayHist: {
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
        console.log(temp);
        setData(temp);
        setCountryList(temp);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProvinceHistory = async (provinces) => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/historical?lastdays=2"
        );

        const provincesHist: any[] = r.data;
        const temp = provinces.map((province) => {
          const hist: any = provincesHist.find(
            (i: any) => i.province === province.province.toLowerCase()
          );
          return {
            ...province,
            twoDayHist: {
              confirmed:
                hist?.timeline.cases[Object.keys(hist?.timeline.cases)[0]],
              deaths:
                hist?.timeline.deaths[Object.keys(hist?.timeline.deaths)[0]],
              recovered:
                hist?.timeline.recovered[ 
                  Object.keys(hist?.timeline.recovered)[0]
                ],
            },
          };
        });

        setProvinceList(temp);
        console.log("province hist: ", temp);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/jhucsse");
        const temp: any[] = r.data;
        const countries: CountryJH[] = temp.map((country, idx) => ({
          ...country,
          id: idx,
        }));

        let countryProv: CountryJH[] = [];
        let names: string[] = [];

        countries.forEach((item: CountryJH) => {
          if (item.province !== null && item.country !== "US") {
            countryProv.push(item);
            if (!names.find((name) => name === item.country)) {
              names.push(item.country);
            }
          }
        });

        setCountryNames(names);
        fetchProvinceHistory(countryProv);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (countryList.length === 0) {
      fetchCountries();
      fetchProvinces();
    }
  }, []);

  useEffect(() => {
    if (countryName === "World") {
      setCountry(undefined);
      setData(countryList);
      setCols(countryTotalCols);
      setDataSource({
        name: "Worldometers",
        url: "https://www.worldometers.info/coronavirus/",
      });
      setFilterModel({
        items: [],
      });
      setDisableDataSelect(false);
    } else {
      setCountry(countryList.find((item) => item.country === countryName));
      setData(provinceList);
      setCols(provinceCols);
      setDataSource({
        name: "John Hopkins University",
        url: "https://coronavirus.jhu.edu/",
      });
      setFilterModel({
        items: [
          {
            columnField: "country",
            operatorValue: "equals",
            value: countryName,
          },
        ],
      });
      setDisableDataSelect(true);
    }
  }, [countryName]);

  useEffect(() => {
    if (dataPerPop) {
      setCols(countryPopCols);
    } else {
      setCols(countryTotalCols);
    }
  }, [dataPerPop]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} justifyContent="space-between">
          <Grid item container xs={12} md={4}>
            {/* <Typography variant="h4">Global Statistics</Typography> */}
            <TableHeader
              setShowPop={setDataPerPop}
              disabled={disableDataSelect}
            />
            <Select
              value={countryName}
              label="Select Country"
              sx={styling.select}
              onChange={(event) => {
                setCountryName(event.target.value);
              }}
            >
              <MenuItem value="World">World</MenuItem>
              {countryNames &&
                countryNames.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </Grid>
          {country && (
            <Grid item container xs={12} md={8} spacing={2} justifyContent="flex-end">
              <Grid item xs={12} md={3} style={{ height: "120px" }}>
                <Paper style={styling.paper}>
                  <img
                    src={country?.countryInfo.flag}
                    alt=""
                    style={styling.flagImg}
                  />
                </Paper>
              </Grid>
              <TotalCard
                title="Total Cases"
                value={country?.cases}
                color="lightblue"
                gridWidth={3}
              />
              <TotalCard
                title="Total Recovered"
                value={country?.recovered}
                color="lightgreen"
                gridWidth={3}
              />
              <TotalCard
                title="Total Deaths"
                value={country?.deaths}
                color="lightcoral"
                gridWidth={3}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={cols}
            rows={data} 
            loading={loading}
            style={styling.dataGrid}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            filterModel={filterModel}
            components={{
              Footer: TableFooter,
            }}
            componentsProps={{
              footer: {
                sourceName: dataSource.name,
                sourceUrl: dataSource.url,
              },
            }}
          />
        </Grid>
        {country ? (
          <CountryDataGraphs country={countryName} />
        ) : (
          <GlobalDataGraphs />
        )}
      </Grid>
    </div>
  );
}

export default GlobalStatsPage;
