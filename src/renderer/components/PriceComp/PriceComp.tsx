import React from 'react';
import { useSelector } from 'react-redux';
import { selectStringPrice, selectIsPriceRising } from '../../store-old/exchange/selectors';

interface Props {
  classes?: any;
}

const PriceComp: React.FC<Props> = ({ classes }) => {
  const price = useSelector(selectStringPrice);
  const isPriceRising = useSelector(selectIsPriceRising);

  return <span className={`${classes?.priceComp} ${isPriceRising ? classes?.red : classes?.green}`}>{price}</span>;
};

export default PriceComp;
