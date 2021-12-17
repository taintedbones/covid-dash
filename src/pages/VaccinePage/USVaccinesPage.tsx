import { useEffect, useState } from "react";
import VaccinesPage from "./VaccinePage";
import { stateVaxCols } from "./VaccineCols";
import { parseData } from "../../Graphs/parseData";
import feats from "../MapPage/MapFeatures/us_states_albers.json";
import axios from "axios";

function USVaccinesPage() {
  const [totals, setTotals] = useState<any>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [mapDomain, setMapDomain] = useState<number[]>([0, 1000000]);

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
    // full data of State totals for 2 days
    const fetchStateData = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=3&fullData=true"
        );

        let data = r.data;
        let total = data.find((i) => i.state === "United States");
        data.splice(data.indexOf(total), 1);

        let index = data.indexOf(
          data.find((i) => i.state === "New York State")
        );
        console.log(index);
        if (index) {
          data[index].state = "New York";
        }

        setTotals(total.timeline[1]);
        setTableData(
          data.map((state, idx) => ({
            ...state,
            id: idx,
          }))
        );

        const temp = data.map((state) => ({
          id: state.state,
          value: state.timeline[1].total,
        }));
        setMapDomain([0, getMax(temp)]);
        setMapData(temp);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTimeline = async () => {
      try {
        const r = await axios.get(
          "https://disease.sh/v3/covid-19/vaccine/coverage/countries/USA?lastdays=10&fullData=false"
        );
        console.log(r.data);
        setTimeline([{ id: "Vaccinations", data: parseData(r.data.timeline) }]);
      } catch (err) {}
    };

    fetchStateData();
    fetchTimeline();

    console.log(tableData);
  }, []);

  return (
    <div>
      <VaccinesPage
        totals={totals}
        tableCols={stateVaxCols}
        tableData={tableData}
        mapData={mapData}
        timeline={timeline}
        mapConfig={{
          proj: {
            min: 350,
            max: 600,
          },
          y: 0.5,
          features: feats.features,
          label: "properties.state_name",
          colors: "nivo",
          domain: mapDomain
        }}
      />
    </div>
  );
}

export default USVaccinesPage;
