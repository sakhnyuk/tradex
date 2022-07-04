import React, { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useViewControllers } from 'app/view-controllers';

const TVChartContainer = () => {
  const { core, tvChartViewController } = useViewControllers();
  const theme = useTheme();
  const appTheme = core.theme;

  useEffect(() => {
    tvChartViewController.loadChart(theme, appTheme);

    return () => {
      tvChartViewController.removeTVWidget();
    };
  }, []);

  return <div id={tvChartViewController.CONTAINER_ID} className="h-full bg-ui-default border-0" />;
};

export default TVChartContainer;
