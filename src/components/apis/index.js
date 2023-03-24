import axios from 'axios';
import moment from 'moment';

export const getCountries = () => axios.get('https://api.covid19api.com/countries');

export const getReportByCountry = (slug) =>
    axios.get(
        `https://api.covid19api.com/dayone/country/${slug}?from=2019-11-17T00:00:00&to=${moment().utc().format()}`,
    );

export const getMapDataByCountryId = (countryId) =>
    import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);
