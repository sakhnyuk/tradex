import React from 'react';
import { makeStyles } from '@material-ui/core';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '../../../utils/setFormatPrice';
import * as exchSel from '../../../store/exchange/selectors';
import styles from '../style';

interface Props {
  pair: {
    symbol: string;
  };
}

const useStyles = makeStyles(styles);

const ListItemTextWithPrice: React.FC<Props> = ({ pair }) => {
  const classes = useStyles();
  const price = useSelector(exchSel.selectPrice);
  const activePair = useSelector(exchSel.selectActivePair);

  return (
    <ListItemText
      className={classes.leftItem}
      classes={{
        primary: classes.price,
        secondary: get(pair, 'priceChangePercent', 0) > 0 ? classes.percentage : classes.percentageRed,
      }}
      primary={formatPrice(pair.symbol === activePair ? price : get(pair, 'price', ''))}
      secondary={`${get(pair, 'priceChangePercent', 0).toFixed(2)}%`}
    />
  );
};

export default ListItemTextWithPrice;
