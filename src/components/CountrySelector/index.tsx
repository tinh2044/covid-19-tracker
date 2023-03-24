import React from 'react';
import { InputLabel, FormHelperText, FormControl, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CountriesType } from '../model';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
        minWidth: 120,
    },
}));

interface Props {
    countries: CountriesType[];
    handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const CountrySelector = ({ countries, handleOnChange, value }: Props) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="country-selector">
                Country
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={(e) => handleOnChange(e)}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {countries.map(({ Country, ISO2 }) => (
                    <option key={ISO2} value={ISO2.toLowerCase()}>
                        {Country}
                    </option>
                ))}
            </NativeSelect>
            <FormHelperText>Please select country</FormHelperText>
        </FormControl>
    );
};

export default CountrySelector;
