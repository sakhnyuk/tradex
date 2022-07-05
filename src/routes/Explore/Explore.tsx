import { Paper } from '@mui/material';
import Header from 'components/AppHeader';
import PairsBar from 'components/PairsBar';
import Trades from 'components/Trades';
import Chart from 'components/Chart';

const Explore = () => {
  return (
    <div className="w-full h-full grid grid-cols-[1fr_320px] grid-rows-[48px_1fr_250px] bg-ui-default">
      <div className="grid col-[1/3] row-[1/2] mb-1">
        <Header />
      </div>

      <div className="m-1 col-[1/2] row-[2/4]">
        <Chart />
      </div>

      <Paper className="my-1 mr-1 col-[2/3] row-[2/3]" variant="outlined" square>
        <PairsBar />
      </Paper>

      <Paper className="mb-1 mr-1 col-[2/3] row-[3/4]" variant="outlined" square>
        <Trades />
      </Paper>

      {/* Exchanges list menu */}
      {/* <Exchanges /> */}
    </div>
  );
};

export default Explore;
