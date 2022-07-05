import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useViewControllers } from 'view-controllers';

const TVChartContainer = () => {
  const { core, tvChartViewController } = useViewControllers();
  const theme = useTheme();
  const appTheme = core.theme;

  useEffect(() => {
    tvChartViewController.loadChart(theme, appTheme);

    return () => {
      tvChartViewController.removeTVWidget();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={tvChartViewController.CONTAINER_ID} className="h-full bg-ui-default border-0" />;
};

export default TVChartContainer;
