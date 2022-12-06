import { ResponsiveChoroplethCanvas } from "@nivo/geo";
import feats from "../MapFeatures/us_states_albers.json";

function USChoroplethMap() {
  return (
    <div style={{ height: "600px", width: "100%", color: "black" }}>
      <ResponsiveChoroplethCanvas
        data={[{
            id: "MS",
            value: "5000000",
        }]}
        features={feats.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="YlOrRd"
        // domain={[0, 1000000]}
        unknownColor="#101b42"
        label="properties.state_name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        projectionScale={400}
        enableGraticule={true}
        graticuleLineColor="rgba(0, 0, 0, .2)"
        borderWidth={0.5}
        borderColor="#101b42"
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
          "background": "transparent",
          // "textColor": "#ffffff",
        }}
      />
    </div>
  );
}

export default USChoroplethMap;
