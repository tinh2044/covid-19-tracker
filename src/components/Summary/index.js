import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { getMapDataByCountryId } from "../apis";
import LineChart from "../Charts/LineChart";
import HighMaps from "../Charts/HighMaps";

export default function Summary({ countryId, report }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);
  const [type, setType] = useState("confirmed");
  let listData;
  let nameChart;
  let colorMap = [];
  if (type === "confirmed") {
    listData = report.map((item) => item.Confirmed);
    nameChart = "covid 19 cases";
    colorMap = [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ];
  } else if (type === "recovered") {
    listData = report.map((item) => item.Confirmed - item.Deaths);
    nameChart = "recovered cases of covid 19";
    colorMap = [
      [0.2, "#a5d6a7"],
      [0.4, "#81c784"],
      [0.6, "#4caf50"],
      [0.8, "#388e3c"],
      [1, "#1b5e20"],
    ];
  } else {
    nameChart = "deaths due to covid 19";
    listData = report.map((item) => item.Deaths);
    colorMap = [
      [0.2, "#f5f5f5"],
      [0.4, "#e0e0e0"],
      [0.6, "#9e9e9e"],
      [0.8, "#616161"],
      [1, "#212121"],
    ];
  }
  let titleTooltip = "Total " + nameChart;
  // name = name + " of " + data[0].Country;

  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart
            data={listData}
            type={type}
            setType={setType}
            nameChart={nameChart}
            titleTooltip={titleTooltip}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps
            mapData={mapData}
            colorMap={colorMap}
            titleTooltip={titleTooltip}
          />
        </Grid>
      </Grid>
    </div>
  );
}
