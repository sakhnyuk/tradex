import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { SeriesStyle } from 'tv-chart/charting_library.min';

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
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {candleTypes.map((candleType) => (
        <MenuItem
          classes={{ root: 'h-5 text-sm' }}
          key={candleType.code}
          onClick={() => setCandleType(candleType.code)}
        >
          {candleType.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
