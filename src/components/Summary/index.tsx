import React, { useEffect, useLayoutEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ReportCovidType } from '../model';
import { getMapDataByCountryId } from '../apis';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';
interface Props {
    countryId: string;
    report: ReportCovidType[];
}

export interface infoChartType {
    listData: number[];
    listDate: string[];
    nameChart: string;
    colorMap: (number | string)[][];
    titleTooltip: string;
    type: string;
}
function Summary({ countryId, report }: Props) {
    console.log(report);
    const [mapData, setMapData] = useState({});
    const [infoChart, setInfoChart] = useState<infoChartType>({
        listData: [],
        listDate: report.map((item) => item.Date),
        nameChart: '',
        colorMap: [],
        titleTooltip: '',
        type: 'confirmed',
    });
    useEffect(() => {
        if (countryId) {
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    useEffect(() => {
        console.log(mapData);
        if (infoChart.type === 'confirmed') {
            setInfoChart({
                ...infoChart,
                listData: report.map((item) => item.Confirmed),
                colorMap: [
                    [0.2, '#FFC4AA'],
                    [0.4, '#FF8A66'],
                    [0.6, '#FF392B'],
                    [0.8, '#B71525'],
                    [1, '	#7A0826'],
                ],
                nameChart: 'covid 19 cases',
            });
        } else if (infoChart.type === 'recovered') {
            setInfoChart({
                ...infoChart,
                listData: report.map((item) => item.Confirmed - item.Deaths),
                colorMap: [
                    [0.2, '#a5d6a7'],
                    [0.4, '#81c784'],
                    [0.6, '#4caf50'],
                    [0.8, '#388e3c'],
                    [1, '#1b5e20'],
                ],
                nameChart: 'recovered cases of covid 19',
            });
        } else {
            setInfoChart({
                ...infoChart,
                listData: report.map((item) => item.Deaths),
                colorMap: [
                    [0.2, '#f5f5f5'],
                    [0.4, '#e0e0e0'],
                    [0.6, '#9e9e9e'],
                    [0.8, '#616161'],
                    [1, '#212121'],
                ],
                nameChart: 'deaths due to covid 19',
            });
        }
    }, [infoChart.type]);

    return (
        <div style={{ height: '500px', marginTop: 10 }}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart
                        data={infoChart.listData}
                        listDate={infoChart.listDate}
                        type={infoChart.type}
                        setType={setInfoChart}
                        nameChart={infoChart.nameChart + ' in ' + report[0].Country}
                        titleTooltip={'Total ' + infoChart.nameChart}
                    />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps
                        mapData={mapData}
                        colorMap={infoChart.colorMap}
                        titleTooltip={'Total ' + infoChart.nameChart}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(Summary);
