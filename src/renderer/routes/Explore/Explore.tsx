import React from 'react';
import { Box, Paper } from '@mui/material';

import Header from '../../components/AppHeader/Header';
// import Trades from '../../components/Trades';
// import OrderBook from '../../components/OrderBook';
// import Exchanges from '../../components/ExchangesMenu';
// import PairsBar from '../../components/PairsBar';
// import Chart from '../../components/Chart';

const Explore = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gridTemplateRows: '48px 1fr 250px',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          gridColumn: '1/3',
          gridRow: '1/2',
          mb: 1,
        }}
      >
        <Header />
      </Box>

      <div>{/* <PairsBar /> */}</div>

      <Box
        sx={{
          gridColumn: '1/2',
          gridRow: '2/4',
          m: 1,
        }}
      >
        {/* <Chart isExplore /> */}
      </Box>

      <Paper
        sx={{
          gridColumn: '2/3',
          gridRow: '2/3',
          my: 1,
          mr: 1,
        }}
        variant="outlined"
        square
      >
        {/* <OrderBook /> */}
      </Paper>

      <Paper
        sx={{
          gridColumn: '2/3',
          gridRow: '3/4',
          mb: 1,
          mr: 1,
        }}
        variant="outlined"
        square
      >
        {/* <Trades /> */}
      </Paper>

      {/* Exchanges list menu */}
      {/* <Exchanges /> */}
    </Box>
  );
};

export default Explore;
