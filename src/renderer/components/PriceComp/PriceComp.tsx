import React from 'react';

interface Props {
  classes?: any;
}

const PriceComp: React.FC<Props> = ({ classes }) => {
  // const price = useSelector(selectStringPrice);
  // const isPriceRising = useSelector(selectIsPriceRising);

  // return <span className={`${classes?.priceComp} ${isPriceRising ? classes?.red : classes?.green}`}>{price}</span>;
  return <span className={`${classes?.priceComp} ${true ? classes?.red : classes?.green}`}>{1000}</span>;
};

export default PriceComp;
