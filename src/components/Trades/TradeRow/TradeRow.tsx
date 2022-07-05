import React from 'react';
import moment from 'moment';
import { formatPrice, formatQuantity } from '../../../utils/setFormatPrice';
import { observer } from 'mobx-react-lite';
import { useViewControllers } from 'view-controllers';
import clsx from 'clsx';

interface Props {
  style: any;
  index: number;
}

const TradeRow: React.FC<Props> = observer(({ style, index }) => {
  const { tradesViewController } = useViewControllers();

  const data = tradesViewController.trades[index];

  return data?.id ? (
    <div
      key={data.id}
      className="h-auto w-auto p-0 flex justify-between hover:font-semibold hover:cursor-pointer"
      style={style}
    >
      <div className={clsx('py-[2px] pr-1 pl-2 text-xs', data.side === 'sell' ? 'text-typo-red' : 'text-typo-green')}>
        {formatPrice(data.price)}
      </div>
      <div className="py-[2px] px-1 text-center text-xs text-typo-primary">{formatQuantity(data.amount)}</div>
      <div className="py-[2px] px-1 text-center text-xs text-typo-primary">
        {formatQuantity(data.price * data.amount)}
      </div>
      <div className="py-[2px] px-1 text-center text-xs text-typo-primary">{moment(data.time).format('HH:mm:ss')}</div>
    </div>
  ) : null;
});

export default TradeRow;
