import { ListItemText } from '@mui/material';
import { formatPrice } from 'app/utils/setFormatPrice';
import clsx from 'clsx';
import { PairInfoModel } from 'core/models';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface Props {
  pair: PairInfoModel;
}

export const ListItemPrice: React.FC<Props> = observer(({ pair }) => {
  return (
    <ListItemText
      className="text-right pr-1 pl-0"
      classes={{
        root: 'flex-2',
        primary: clsx('text-right px-0 text-xs'),
      }}
      primary={formatPrice(pair.price)}
    />
  );
});
