import React, { useEffect } from 'react';
import ChartHeader from './ChartHeader';

import { useTheme } from '@mui/material';
import { useViewControllers } from 'app/view-controllers';

const TVChartContainer = () => {
  const { core, tvChartViewController } = useViewControllers();

  const appTheme = core.theme;

  const theme = useTheme();

  useEffect(() => {
    tvChartViewController.loadTradingViewWidget(theme, appTheme);

    return () => {
      tvChartViewController.removeTVWidget();
    };
  }, []);

  return (
    <>
      <ChartHeader />
      <div id={tvChartViewController.CONTAINER_ID} className="h-[calc(100%-20px)] bg-ui-default border-0" />
    </>
  );
};

export default TVChartContainer;
