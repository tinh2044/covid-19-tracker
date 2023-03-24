import React, { useEffect, useMemo, useCallback, useState, useLayoutEffect } from 'react';
import { sortBy } from 'lodash';
import moment from 'moment';
import '@fontsource/roboto';
import { Container, Typography } from '@material-ui/core';
import 'moment/locale/vi';

import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';
import Summary from './components/Summary';
import Highlight from './components/Highlight';
import { CountriesType, ReportCovidType } from './components/model';

moment.locale('en');

const App = () => {
    const [countries, setCountries] = useState<CountriesType[]>([]);
    const [selectedCountryId, setSelectedCountryId] = useState<string>('');
    const [report, setReport] = useState<ReportCovidType[]>([]);

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCountryId(e.target.value);
        },
        [setSelectedCountryId],
    );

    useEffect(() => {
        console.log('hello');
        if (selectedCountryId) {
            const selectedCountry: CountriesType | undefined = countries.find(
                (country) => country.ISO2 === selectedCountryId.toUpperCase(),
            );
            if (selectedCountry) {
                getReportByCountry(selectedCountry.Slug).then(({ data }) => {
                    data.pop();
                    console.log(selectedCountry);
                    setReport(data);
                });
            }
        }
    }, [selectedCountryId]);

    const summary = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    title: 'Total number of covid-19 infections',
                    count: latestData.Confirmed,
                    type: 'confirmed',
                },
                {
                    title: 'Total number of covid-19 recovered',
                    count: latestData.Confirmed - latestData.Deaths,
                    type: 'recovered',
                },
                {
                    title: 'Total number of  deaths due covid-1',
                    count: latestData.Deaths,
                    type: 'death',
                },
            ];
        }
        return [];
    }, [report]);
    useLayoutEffect(() => {
        getCountries().then((res) => {
            const { data } = res;
            console.log(res);
            const countries = sortBy(data, 'Country');
            setCountries(countries);
            setSelectedCountryId('vn');
        });
    }, []);
    return (
        <Container style={{ marginTop: 20 }}>
            <Typography variant="h2" component="h2">
                COVID-19 TRACKER
            </Typography>
            <Typography>{moment().format('LLL')}</Typography>
            <CountrySelector handleOnChange={handleOnChange} countries={countries} value={selectedCountryId} />
            <Highlight summary={summary} />
            <Summary countryId={selectedCountryId} report={report} />
        </Container>
    );
};

export default React.memo(App);
