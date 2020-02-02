import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

import styles from './styles';

const useStyles = makeStyles(styles);

const Analysis = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>{/* <Header isAnalysis /> */}</div>
      {/* <div className={classes.pairBar}>
        <PairsBar />
      </div> */}
      <div className={classes.chartFullPage}>{/* <FourChart /> */}</div>

      <Paper className={classes.orderBook}>{/* <OrderBook /> */}</Paper>
      <Paper className={classes.trades}>{/* <Trades /> */}</Paper>

      {/* <Exchanges showDemo /> */}
    </div>
  );
};

export default Analysis;
