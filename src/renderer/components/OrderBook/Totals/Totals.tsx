import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';

import PriceComp from '../../PriceComp';
import { formatQuantity } from '../../../utils/setFormatPrice';
import styles from '../style';
import * as selectExchange from '../../../store/exchange/selectors';

const useStyles = makeStyles(styles);

const Totals: React.FC = () => {
  const classes = useStyles();
  const orderbook = useSelector(selectExchange.selectOrderbook);
  const activePair = useSelector(selectExchange.selectActivePair);

  const { asksTotalBase, bidsTotalQuote } = orderbook;
  const [base, quote] = activePair.split(/[:/]/);

  return (
    <div>
      <Divider />
      <ListItem className={classes.centralInfoPanel}>
        <ListItemText className={classes.price}>
          <PriceComp classes={classes} />
        </ListItemText>
        <div className={classes.baseTotal}>{`To sell: ${formatQuantity(asksTotalBase)} ${base}`}</div>
        <div className={classes.quoteTotal}>{`To buy: ${formatQuantity(bidsTotalQuote)} ${quote}`}</div>
      </ListItem>
      <Divider />
    </div>
  );
};

export default Totals;
