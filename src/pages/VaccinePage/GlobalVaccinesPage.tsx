import React, { useEffect, useState } from "react";
import VaccinesPage from "./VaccinePage";
import { getCountryISO3 } from "../../scripts/CountryISO3Match";
import { countryVaxCols } from "./VaccineCols";
import { parseData } from "../../Graphs/parseData";
import feats from "../MapPage/MapFeatures/world_countries.json";
import axios from "axios";

function GlobalVaccinesPage() {
  const [totals, setTotals] = useState<any>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [sortModel, setSortModel] = useState<any[]>([{}]);

  // simple data of global totals for past 10 days

  useEffect(() => {
    // full data of global total for today
    const fetchGlobalTotal = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=2&fullData=true"
        );
        setTotals(r.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    // full data of country totals for 2 days
    const fetchCountryData = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=3&fullData=true"
        );

        setTableData(r.data.map((country, idx) => ({
            ...country,
            id: idx
        })));

        setMapData(r.data.map((country) => ({
            id: getCountryISO3(country.country),
            value: country.timeline[1].total
        })));

      } catch (err) {
        console.error(err);
      }
    };

    const fetchTimeline = async () => {
        try {
            const r = await axios.get("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=10&fullData=false");
            console.log(r.data);
            setTimeline([{id: "Vaccinations", data: parseData(r.data)}]);
        } catch (err) {

        }
    };

    fetchGlobalTotal();
    fetchCountryData();
    fetchTimeline();

    console.log(tableData);
  }, []);

  return (
    <div>
      <VaccinesPage
        totals={totals}
        tableCols={countryVaxCols}
        tableData={tableData}
        mapData={mapData}
        timeline={timeline}
        mapConfig={{
            proj: {
              min: 125,
              max: 600,
            },
            y: 0.63,
            features: feats.features,
            label: "properties.name",
            colors: "PuBu"
          }}
      />
    </div>
  );
}

export default GlobalVaccinesPage;
