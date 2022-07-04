import React from 'react';
import { Paper } from '@mui/material';
import TVChartContainer from 'app/components/TVChartContainer';

const Chart = () => {
  return (
    <Paper className="w-full h-full bg-ui-default">
      <TVChartContainer />
    </Paper>
  );
};

export default Chart;
