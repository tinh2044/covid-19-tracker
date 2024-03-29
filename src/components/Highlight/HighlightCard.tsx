import React from 'react';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';

interface Props {
    title: string;
    count: number;
    type: string;
}

const useStyles = makeStyles({
    wrapper: (props: { type: string }) => {
        if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c' };
        if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' };
        else return { borderLeft: '5px solid gray' };
    },
    title: { fontSize: 18, marginBottom: 5 },
    count: { fontWeight: 'bold', fontSize: 18 },
});

function HighlightCard({ title, count, type }: Props) {
    const classes = useStyles({ type });
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography variant="body2" component="p" className={classes.title}>
                    {title}
                </Typography>
                <Typography variant="body2" component="span" className={classes.count}>
                    <CountUp end={count} separator=" " duration={2} />
                </Typography>
            </CardContent>
        </Card>
    );
}

export default HighlightCard;
