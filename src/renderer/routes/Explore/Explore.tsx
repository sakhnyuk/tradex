import React from 'react';
import { Box, Paper } from '@mui/material';

import Header from 'app/components/AppHeader';
import PairsBar from 'app/components/PairsBar';
// import Trades from '../../components/Trades';
// import OrderBook from '../../components/OrderBook';
// import Exchanges from '../../components/ExchangesMenu';
// import PairsBar from '../../components/PairsBar';
// import Chart from '../../components/Chart';

const Explore = () => {
  return (
    <div className="w-full h-full grid grid-cols-[1fr_320px] grid-rows-[48px_1fr_250px] bg-ui-default">
      <div className="grid col-[1/3] row-[1/2] mb-1">
        <Header />
      </div>

      <PairsBar />

      <div className="m-1 col-[1/2] row-[2/4]">{/* <Chart isExplore /> */}</div>

      <Paper className="my-1 mr-1 col-[2/3] row-[2/3]" variant="outlined" square>
        {/* <OrderBook /> */}
      </Paper>

      <Paper className="mb-1 mr-1 col-[2/3] row-[3/4]" variant="outlined" square>
        {/* <Trades /> */}
      </Paper>

      {/* Exchanges list menu */}
      {/* <Exchanges /> */}
    </div>
  );
};

export default Explore;
