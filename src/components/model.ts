export interface CountriesType {
    Country: string;
    Slug: string | undefined;
    ISO2: string;
}

export interface ReportCovidType {
    ID: string;
    Country: string;
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Date: string;
}

export interface SummaryType {
    title: string;
    count: number;
    type: string;
}
