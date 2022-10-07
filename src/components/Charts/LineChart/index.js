import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';
import { red, green, grey } from '@material-ui/core/colors';

const generateOptions = (data, type, color, name, titleTooltip) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            height: 500,
        },
        title: {
            text: `The chart shows the total number of ${name}`,
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: [color],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: titleTooltip,
                data: data,
            },
        ],
    };
};

export default function LineChart({ data, type, setType, nameChart, titleTooltip }) {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');

    const typeColor = type === 'confirmed' ? red[900] : type === 'recovered' ? green[500] : grey[900];

    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(Math.max(data.length - 30, 1));
                break;
            case '7':
                customData = data.slice(Math.max(data.length - 7, 1));
                break;

            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData, type, typeColor, nameChart, titleTooltip));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, reportType, type, typeColor]);

    return (
        <>
            <ButtonGroup
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                }}
            >
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        onClick={() => setType('confirmed')}
                        style={
                            type === 'confirmed'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                    >
                        Tnfections
                    </Button>
                    <Button
                        onClick={() => setType('recovered')}
                        style={
                            type === 'recovered'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                    >
                        Recovered
                    </Button>
                    <Button
                        onClick={() => setType('deaths')}
                        style={
                            type === 'deaths'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                    >
                        Deaths
                    </Button>
                </ButtonGroup>
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        style={
                            reportType === 'all'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                        onClick={() => setReportType('all')}
                    >
                        ALL
                    </Button>
                    <Button
                        style={
                            reportType === '30'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                        onClick={() => setReportType('30')}
                    >
                        30 day before
                    </Button>
                    <Button
                        style={
                            reportType === '7'
                                ? {
                                      color: typeColor,
                                      border: `1.5px solid ${typeColor}`,
                                      fontWeight: 600,
                                  }
                                : {}
                        }
                        onClick={() => setReportType('7')}
                    >
                        7 day before
                    </Button>
                </ButtonGroup>
            </ButtonGroup>

            <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
}
