import { Menu, MenuItem } from '@mui/material';
import { ChartTimeframe } from 'core/types';
import React from 'react';
import { intervalDictionary } from '../../ChartHeader';

interface Props {
  anchorEl: Element | null;
  handleClose: () => void;
  intervals: ChartTimeframe[];
  onIntervalChange: (timeframe: ChartTimeframe) => void;
}

export const IntervalMenu: React.FC<Props> = ({ anchorEl, handleClose, intervals, onIntervalChange }) => {
  const handleIntervalChange = (interval: ChartTimeframe) => {
    onIntervalChange(interval);
    handleClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {intervals.map((interval) => (
        <MenuItem classes={{ root: 'h-5 text-sm' }} key={interval} onClick={() => handleIntervalChange(interval)}>
          {intervalDictionary[interval]}
        </MenuItem>
      ))}
    </Menu>
  );
};
