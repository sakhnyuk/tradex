import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

import Header from '../../components/TradeHeader/Header';
import Trades from '../../components/Trades';
import OrderBook from '../../components/OrderBook';
import styles from './styles';
import Exchanges from '../../components/ExchangesMenu';
import PairsBar from '../../components/PairsBar';
import Chart from '../../components/Chart';

const useStyles = makeStyles(styles);

const Explore = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header isExplore />
      </div>
      <div>
        <PairsBar />
      </div>
      <div className={classes.chartFullPage}>
        <Chart isExplore />
      </div>

      <Paper className={classes.orderBook} elevation={3} variant="outlined" square>
        <OrderBook />
      </Paper>
      <Paper className={classes.trades} variant="outlined">
        <Trades />
      </Paper>

      {/* Exchanges list menu */}
      <Exchanges isExplore />
    </div>
  );
};

export default Explore;
