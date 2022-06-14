import React from 'react';
import { TableHead, TableRow, CircularProgress, Table, TableCell, Grid, Typography } from '@mui/material';
import { AutoSizer, List } from 'react-virtualized';
import { useViewControllers } from 'app/view-controllers';
import TradeRow from './TradeRow';
import { observer } from 'mobx-react-lite';

const Trades = observer(() => {
  const { tradesViewController } = useViewControllers();

  console.log(tradesViewController.trades.length);

  if (tradesViewController.isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const renderRow = ({ index, style, key }) => {
    return <TradeRow index={index} style={style} key={key} />;
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Table>
        <TableHead>
          <TableRow className="h-6">
            <TableCell className="text-typo-secondary px-5 py-1 text-xs font-normal">Recent trades</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table className="overflow-y-scroll overflow-x-hidden outline-none">
        <TableHead>
          <TableRow className="h-6">
            <TableCell
              padding="none"
              align="center"
              className="text-typo-primary h-full text-xs font-normal"
              variant="head"
            >
              Price
            </TableCell>

            <TableCell
              padding="none"
              align="center"
              className="text-typo-primary h-full text-xs font-normal"
              variant="head"
            >
              Quantity
            </TableCell>

            <TableCell
              padding="none"
              align="center"
              className="text-typo-primary h-full text-xs font-normal"
              variant="head"
            >
              Total
            </TableCell>

            <TableCell
              padding="none"
              align="center"
              className="text-typo-primary h-full text-xs font-normal"
              variant="head"
            >
              Time
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Grid container className="w-full flex-grow" style={{ height: 'calc(100% - 50px)' }} spacing={0}>
        <Grid item xs={12}>
          <AutoSizer>
            {({ width, height }: any) => (
              <List
                className="overflow-y-scroll overflow-x-hidden outline-none"
                width={width}
                height={height}
                rowCount={tradesViewController.trades.length}
                rowHeight={19}
                rowRenderer={renderRow}
                noRowsRenderer={() => <Typography className="mt-1 ml-2">There are no trades</Typography>}
              />
            )}
          </AutoSizer>
        </Grid>
      </Grid>
    </div>
  );
});

export default Trades;
