import { ListItemText } from '@mui/material';
import { useViewControllers } from 'app/view-controllers';
import clsx from 'clsx';
import { PairInfoModel } from 'core/models';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { formatPrice } from '../../../utils/setFormatPrice';

interface Props {
  pair: PairInfoModel;
}

const ListItemTextWithPrice: React.FC<Props> = observer(({ pair }) => {
  const { pairViewController } = useViewControllers();

  return (
    <ListItemText
      className="text-right pr-1 pl-0"
      classes={{
        primary: 'text-xs',
        secondary: clsx('text-right px-0 text-xs', pair.priceChangePercent > 0 ? 'text-typo-green' : 'text-typo-red'),
      }}
      primary={formatPrice(pair.price)}
      secondary={`${pair.priceChangePercent.toFixed(2)}%`}
    />
  );
});

export default ListItemTextWithPrice;
