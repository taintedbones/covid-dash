import { ResponsiveBar } from "@nivo/bar";
import { Grid, Typography, Paper } from "@mui/material";
import React from "react";

function BarGraph({ title, data }) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ height: "500px", width: "100%" }}>
        <Paper style={{ height: "inherit", padding: "10px", color: "black" }}>
          <ResponsiveBar
            data={data}
            keys={["deaths","cases"]}
            indexBy="date"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            // valueScale={{ type: "linear" }}
            // indexScale={{ type: "band", round: true }}
            colors="nivo"
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            // borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={undefined}
            axisRight={undefined}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "country",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "food",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            // labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            labelTextColor="#000000"
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            // role="application"
            // ariaLabel="Nivo bar chart demo"
            // barAriaLabel={function (e) {
            //   return (
            //     e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            //   );
            // }}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default BarGraph;
