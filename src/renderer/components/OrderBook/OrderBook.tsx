import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import RenderTable from './RenderTable';
import Totals from './Totals';
import TableHeader from './TableHeader';

import styles from './style';
import { selectCore } from '../../store-old/core/selectors';

const useStyles = makeStyles(styles);

const OrderBook = () => {
  const classes = useStyles();

  const orderBookIsLoading = useSelector(selectCore.orderBookIsLoading);

  if (orderBookIsLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <Table>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.titleHeader}>Orderbook</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <TableHeader />

      <div className={classes.root}>
        <div id="ask" className={classes.askArea}>
          <div className={classes.table}>
            <RenderTable side="asks" color="red" />
          </div>
        </div>

        <Totals />

        <div className={classes.bidArea}>
          <div className={classes.table}>
            <RenderTable side="bids" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
