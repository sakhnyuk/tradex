import React, { useEffect } from 'react';
// import ChartHeader from './ChartHeader';

import { useTheme } from '@mui/material';
import { useViewControllers } from 'app/view-controllers';

const TVChartContainer = () => {
  const { exchangeViewController, pairViewController, core, tvChartViewController } = useViewControllers();

  const exchange = exchangeViewController.activeExchange;
  const symbol = pairViewController.activePair;
  const appTheme = core.theme;
  const isOnline = core.isOnline;

  const theme = useTheme();

  useEffect(() => {
    tvChartViewController.loadTradingViewWidget(theme, appTheme);

    return () => {
      tvChartViewController.removeTVWidget();
    };
  }, []);

  // useEffect(() => {
  //   tvChartViewController.refetchData();
  // }, [exchange, symbol, isOnline]);

  // useEffect(() => {
  //   tvChartViewController.applyTheme(theme, appTheme);
  // }, [appTheme]);

  return (
    <>
      {/* <ChartHeader
        setCandleType={setCandleType}
        activeInterval={interval}
        showIndicatorsDialog={showIndicatorsDialog}
        containerId={containerId}
        isExplore={isExplore}
      /> */}
      <div id="tv_chart_container" className="h-full bg-ui-default border-0" />
    </>
  );
};

export default TVChartContainer;
