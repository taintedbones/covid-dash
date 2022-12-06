import React, { useState } from "react";
import { ResponsiveChoroplethCanvas } from "@nivo/geo";
import { Grid, Slider, Paper, Button, Typography } from "@mui/material";

function MapChart({ data, mapConfig }) {
  const defaultX = 0.5;
  const defaultY = mapConfig.y;
  const defaultProj = mapConfig.proj.min;
  const [projScale, setProjScale] = useState<any>(mapConfig.proj.min);
  const [x, setX] = useState<any>(defaultX);
  const [y, setY] = useState<any>(defaultY);

  const styling = {
    grid: {
      height: "580px",
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
      <Grid item container xs={12} spacing={1}>
        <Grid item container xs={12}>
          <Paper style={styling.paper}>
            <Grid item xs={12} style={styling.grid}>
              <ResponsiveChoroplethCanvas
                data={data}
                features={mapConfig.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors={mapConfig.colors}
                // domain={mapConfig.domain}
                unknownColor="#8c8c8c"
                label={mapConfig.label}
                valueFormat=".2s"
                projectionTranslation={[x, y]}
                projectionRotation={[0, 0, 0]}
                projectionScale={projScale}
                enableGraticule={true}
                graticuleLineColor="rgba(0, 0, 0, .2)"
                borderWidth={0.5}
                borderColor="#000000"
                // legends={[
                //   {
                //     anchor: "bottom-left",
                //     direction: "column",
                //     justify: true,
                //     translateX: 20,
                //     translateY: -60,
                //     itemsSpacing: 0,
                //     itemWidth: 92,
                //     itemHeight: 18,
                //     itemDirection: "left-to-right",
                //     itemOpacity: 0.85,
                //     symbolSize: 18,
                //   },
                // ]}
                theme={{
                  background: "transparent",
                  // textColor: "#ffffff",
                }}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={12}>
          <Paper style={{ width: "100%", padding: "10px" }}>
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item container xs={12} md={3}>
                <Grid item xs={12} md={3}>
                  <Typography variant="button">Zoom:</Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Slider
                    value={projScale}
                    step={10}
                    min={mapConfig.proj.min}
                    max={mapConfig.proj.max}
                    onChange={(event, value) => setProjScale(value)}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={3}>
                <Grid item xs={12} md={3}>
                  <Typography variant="button">Move X:</Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Slider
                    value={x}
                    step={0.1}
                    track="inverted"
                    min={-1}
                    max={1}
                    onChange={(event, value) => setX(value)}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={3}>
                <Grid item xs={12} md={3}>
                  <Typography variant="button">Move Y:</Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Slider
                    value={y}
                    step={0.1}
                    min={-1}
                    max={1}
                    onChange={(event, value) => setY(value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setX(defaultX);
                    setY(defaultY);
                    setProjScale(defaultProj);
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MapChart;
