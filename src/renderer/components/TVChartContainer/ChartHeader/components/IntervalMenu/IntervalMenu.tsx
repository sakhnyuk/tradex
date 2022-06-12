import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Intervals } from '../../../../../store-old/exchange/types';
import { useStyles, intervalDictionary } from '../../ChartHeader';

interface Props {
  anchorEl: Element | null;
  handleClose: () => void;
  intervals: Intervals[];
  onIntervalChange: (interval: Intervals) => void;
}

export const IntervalMenu: React.FC<Props> = ({ anchorEl, handleClose, intervals, onIntervalChange }) => {
  const classes = useStyles();
  const handleIntervalChange = (interval: Intervals) => {
    onIntervalChange(interval);
    handleClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {intervals.map((interval) => (
        <MenuItem classes={{ root: classes.menuItem }} key={interval} onClick={() => handleIntervalChange(interval)}>
          {intervalDictionary[interval]}
        </MenuItem>
      ))}
    </Menu>
  );
};
