import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { useSelector } from 'react-redux';
import { AutoSizer, List } from 'react-virtualized';
import { CircularProgress } from '@material-ui/core';
import TradeRow from './TradeRow';
// import Loader from '../Loader';

import styles from './style';
import { selectCore } from '../../store/core/selectors';

const useStyles = makeStyles(styles);

const Trades = () => {
  const classes = useStyles();

  const tradesIsLoading = useSelector(selectCore.tradesIsLoading);

  if (tradesIsLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.titleHeader}>Recent trades</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell padding="none" align="center" className={classes.cellHeader} variant="head">
              Price
            </TableCell>

            <TableCell padding="none" align="center" className={classes.cellHeader} variant="head">
              Quantity
            </TableCell>

            <TableCell padding="none" align="center" className={classes.cellHeader} variant="head">
              Total
            </TableCell>

            <TableCell padding="none" align="center" className={classes.cellHeader} variant="head">
              Time
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Grid container className={classes.tableTrades} spacing={0}>
        <Grid item xs={12}>
          <AutoSizer>
            {({ width, height }: any) => (
              <List
                className={classes.table}
                width={width}
                height={height}
                rowCount={20}
                rowHeight={19}
                rowRenderer={({ index, style, key }: any) => <TradeRow index={index} style={style} key={key} />}
              />
            )}
          </AutoSizer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Trades;
