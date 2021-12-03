import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

function LineGraph({ title, data }) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ height: "500px", width: "100%" }}>
        <Paper style={{ height: "inherit", padding: "10px", color: "black" }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 10, right: 130, bottom: 70, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=">-.1f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5, 
              tickPadding: 5,
              tickRotation: -35,
              legend: "Date (10 Day Period)",
              legendOffset: 50,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Cases (per million)",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            pointSize={7}
            pointColor={{ theme: "grid.line.stroke" }}
            colors={{ scheme: "accent" }}
            lineWidth={6}
            theme={{ textColor: "white" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default LineGraph;
