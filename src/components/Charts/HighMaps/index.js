import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = (colorMap, titleTooltip) => {
  return {
    chart: {
      height: "500",
    },
    title: {
      text: null,
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: colorMap,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "bottom",
    },
    series: [
      {
        name: titleTooltip,
        joinBy: ["hc-key", "key"],
      },
    ],
  };
};

const HighMaps = ({ mapData, colorMap, titleTooltip }) => {
  console.log(colorMap);
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      console.log({ mapData });
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));

      setOptions(() => ({
        ...initOptions(colorMap, titleTooltip),
        title: {
          text: mapData.title,
        },
        series: [
          {
            ...initOptions(colorMap, titleTooltip).series[0],
            mapData: mapData,
            data: fakeData,
          },
        ],
      }));

      if (!mapLoaded) setMapLoaded(true);
    }
  }, [mapData, mapLoaded, colorMap, titleTooltip]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={chartRef}
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default HighMaps;
