import React from 'react';
import { Grid } from '@material-ui/core';
// import HighlightCard from './HighlightCard';

import { SummaryType } from '../model';
import HighlightCard from './HighlightCard';

interface Props {
    summary: SummaryType[];
}

const Highlight = ({ summary }: Props) => {
    return (
        <Grid container spacing={3}>
            {summary.map((data: any, index: number) => (
                <Grid item key={index} sm={4} xs={12}>
                    <HighlightCard title={data.title} count={data.count} type={data.type} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Highlight;
