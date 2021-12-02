import React, { useState } from "react";
import { ResponsiveChoroplethCanvas } from "@nivo/geo";
import { Grid, Slider, Paper } from "@mui/material";

function MapChart({ data, mapConfig }) {
  const [projScale, setProjScale] = useState<any>(mapConfig.proj.min);
  const styling = {
    grid: {
      height: "600px",
      width: "100%",
    },
    paper: {
      height: "600px",
      width: "100%",
      color: "black",
    },
  };

  return (
    <React.Fragment>
      <Grid item xs={12} style={styling.grid}>
        <Paper style={styling.paper}>
          <ResponsiveChoroplethCanvas
            data={data}
            features={mapConfig.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="YlOrRd"
            domain={[0, 1000000]}
            unknownColor="#101b42"
            label={mapConfig.label}
            valueFormat=".2s"
            projectionTranslation={[0.5, mapConfig.y]}
            projectionRotation={[0, 0, 0]}
            projectionScale={projScale}
            enableGraticule={true}
            graticuleLineColor="rgba(0, 0, 0, .2)"
            borderWidth={0.5}
            borderColor="#101b42"
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -60,
                itemsSpacing: 0,
                itemWidth: 92,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 18,
              },
            ]}
            theme={{
              background: "transparent",
              textColor: "white",
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Slider
          value={projScale}
          step={10}
          min={mapConfig.proj.min}
          max={mapConfig.proj.max}
          onChange={(event, value) => setProjScale(value)}
        />
      </Grid>
    </React.Fragment>
  );
}

export default MapChart;
