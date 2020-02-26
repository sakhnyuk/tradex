/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// import TVChartContainer from '../TVChartContainer';
import styles from './styles';
import { chartSelector } from '../../store/chart/selectors';
import { useChartActions } from '../../store/chart/useChartActions';
import { LayoutsIntervalsKeys } from '../../store/chart/types';
import TVChartContainer from '../TVChartContainer';

const useStyles = makeStyles(styles);

interface Props {
  isExplore?: boolean;
}

// there in ternary it uses one of two functions from different stores
// first preserve layouts for 1-4 charts in not default mode
// second for main chart and placed in tradingcore reduxer for per account caching

// and keys equals indexes to not rerender all charts everytime
const FourChart: React.FC<Props> = ({ isExplore }) => {
  const classes = useStyles();

  const layout = useSelector(chartSelector.layout);
  const interval = useSelector(chartSelector.interval);
  const layoutIntervals = useSelector(chartSelector.layoutIntervals);

  const layoutsKeys: LayoutsIntervalsKeys[] = Object.keys(layoutIntervals) as Array<keyof typeof layoutIntervals>;

  return (
    <div id="fourChartElId" className={classes.root}>
      {layoutsKeys.map((key, index) => (
        <Paper className={classes[key]} key={index}>
          <TVChartContainer
            containerId={key}
            interval={layout !== 'one' ? layoutIntervals[key] : interval}
            defaultCase={layout === 'one'}
            isExplore={isExplore}
          />
        </Paper>
      ))}
    </div>
  );
};

export default withStyles(styles)(FourChart);
