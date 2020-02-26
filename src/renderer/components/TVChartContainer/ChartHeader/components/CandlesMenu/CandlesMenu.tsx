import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useStyles } from '../../ChartHeader';
import { SeriesStyle } from '../../../../../../charting_library/charting_library.min';

const candleTypes = [
  { name: 'Bars', code: 0 },
  { name: 'Candles', code: 1 },
  { name: 'Hollow candles', code: 9 },
  { name: 'Heiken ashi', code: 8 },
  { name: 'Line', code: 2 },
  { name: 'Area', code: 3 },
  { name: 'Baseline', code: 10 },
];

interface Props {
  setCandleType: (type: SeriesStyle) => void;
  anchorEl: Element | null;
  handleClose: () => void;
}

export const CandlesMenu: React.FC<Props> = ({ setCandleType, anchorEl, handleClose }) => {
  const classes = useStyles();

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {candleTypes.map(candleType => (
        <MenuItem
          classes={{ root: classes.menuItem }}
          key={candleType.code}
          onClick={() => setCandleType(candleType.code)}
        >
          {candleType.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
