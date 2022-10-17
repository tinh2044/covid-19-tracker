import React from 'react';
import { InputLabel, FormHelperText, FormControl, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
        minWidth: 120,
    },
}));

export default function CountrySelector({ countries, handleOnChange, value }) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="country-selector">
                Country
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
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
}

CountrySelector.defaultProps = {
    countries: [],
};
