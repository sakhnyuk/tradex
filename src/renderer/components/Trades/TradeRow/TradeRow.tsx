/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import { formatPrice, formatQuantity } from '../../../utils/setFormatPrice';
import * as select from '../../../store-old/exchange/selectors';

import styles from '../style';
import { Store } from '../../../store-old/types';

const useStyles = makeStyles(styles);

interface Props {
  style: any;
  index: number;
}

const TradeRow: React.FC<Props> = ({ style, index }) => {
  const classes = useStyles();

  const data = useSelector((state: Store) => select.selectTradeRow(state, index));

  return data?.id ? (
    <div key={data.id} className={classes.row} style={style}>
      <div className={data.side === 'sell' ? classes.priceSell : classes.priceBuy}>{formatPrice(data.price)}</div>
      <div className={classes.cell}>{formatQuantity(data.amount)}</div>
      <div className={classes.cell}>{formatQuantity(data.price * data.amount)}</div>
      <div className={classes.cell}>{moment(data.timestamp).format('HH:mm:ss')}</div>
    </div>
  ) : null;
};

export default TradeRow;
