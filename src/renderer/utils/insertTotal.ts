export const insertTotalAsks = (asks: number[][]) => {
  const newAsks = [];
  let quoteTotal = 0;
  let baseTotal = 0;
  for (let index = asks.length - 1; index >= 0; index--) {
    const [price, base] = asks[index];
    const quote = price * base;
    quoteTotal += quote;
    baseTotal += base;
    newAsks[index] = [price, base, quote, quoteTotal, baseTotal];
  }

  return [newAsks, baseTotal, quoteTotal];
};

export const insertTotalBids = (bids: number[][]) => {
  const newBids = [];
  let quoteTotal = 0;
  let baseTotal = 0;
  for (let index = 0; index < bids.length; index++) {
    const [price, base] = bids[index];
    const quote = price * base;
    quoteTotal += quote;
    baseTotal += base;
    newBids[index] = [price, base, quote, quoteTotal, baseTotal];
  }

  return [newBids, baseTotal, quoteTotal];
};
