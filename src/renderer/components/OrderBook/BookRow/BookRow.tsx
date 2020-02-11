import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, shallowEqual } from 'react-redux';
import { formatPrice, formatQuantity } from '../../../utils/setFormatPrice';

import { selectOrderbookRow, selectOrderbook } from '../../../store/exchange/selectors';
import { Store } from '../../../store/types';
import styles from '../style';

const useStyles = makeStyles(styles);

interface Props {
  color: 'green' | 'red';
  side: 'bids' | 'asks';
  index: number;
  style: React.CSSProperties;
}

const BookRow: React.FC<Props> = ({ color, style, side, index }) => {
  const classes = useStyles();
  const { asksTotalQuote, asks } = useSelector(selectOrderbook);

  const [price, base, quote, quoteTotal] = useSelector(
    (state: Store) => selectOrderbookRow(state, side, index),
    shallowEqual,
  );

  const redLine = quote > asksTotalQuote / asks.length ? classes.backgroundRowRed : classes.backgroundRowRed2;
  const greenLine = quote > asksTotalQuote / asks.length ? classes.backgroundRowGreen : classes.backgroundRowGreen2;

  // base ? because react-virtualized work not correct if there is less then list length in list
  return base ? (
    <div className={`${classes.row} ${color === 'red' ? redLine : greenLine}`} style={style}>
      <div className={color === 'red' ? classes.askSide : classes.bidSide}>{formatPrice(price)}</div>
      <div className={classes.cell}>{formatQuantity(base)}</div>
      <div className={classes.cell}>{formatQuantity(quote)}</div>
      <div className={classes.cell}>{formatQuantity(quoteTotal)}</div>
    </div>
  ) : null;
};

export default BookRow;
