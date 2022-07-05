import { ListItemText } from '@mui/material';
import clsx from 'clsx';
import { PairInfoModel } from 'lib/core/models';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface Props {
  pair: PairInfoModel;
}

export const ListItemChange: React.FC<Props> = observer(({ pair }) => {
  return (
    <ListItemText
      className="text-right pr-1 pl-0"
      classes={{
        root: 'flex-1',
        primary: clsx('text-right px-0 text-xs', pair.priceChangePercent > 0 ? 'text-typo-green' : 'text-typo-red'),
      }}
      primary={`${pair.priceChangePercent.toFixed(2)}%`}
    />
  );
});
