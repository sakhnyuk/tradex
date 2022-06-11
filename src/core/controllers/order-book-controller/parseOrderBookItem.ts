import { OrderBookItemDto } from 'core/models';

export interface ParsedOrderBookValues {
  orderBookList: OrderBookItemDto[];
  baseTotal: number;
  quoteTotal: number;
}

/**
 * Accepts raw order book [price, volume], calculate quote order volume and total values
 * @param asks - [price, base]
 * @returns
 */
export const parseTotalAsks = (asks: [Price, TradeVolume][]): ParsedOrderBookValues => {
  const newAsks: OrderBookItemDto[] = [];
  let quoteTotal = 0;
  let baseTotal = 0;

  for (let index = asks.length - 1; index >= 0; index--) {
    const [price, base] = asks[index];
    const quote = price * base;
    quoteTotal += quote;
    baseTotal += base;

    const orderBookItemDto: OrderBookItemDto = {
      price,
      base,
      quote,
      quoteTotal,
      baseTotal,
    };

    newAsks[index] = orderBookItemDto;
  }

  return { orderBookList: newAsks, baseTotal, quoteTotal };
};

/**
 * Accepts raw order book [price, volume], calculate quote order volume and total values
 * @param bids - [price, base]
 * @returns
 */
export const parseTotalBids = (bids: [Price, TradeVolume][]): ParsedOrderBookValues => {
  const newBids: OrderBookItemDto[] = [];
  let quoteTotal = 0;
  let baseTotal = 0;
  for (let index = 0; index < bids.length; index++) {
    const [price, base] = bids[index];
    const quote = price * base;
    quoteTotal += quote;
    baseTotal += base;

    const orderBookItemDto: OrderBookItemDto = {
      price,
      base,
      quote,
      quoteTotal,
      baseTotal,
    };

    newBids[index] = orderBookItemDto;
  }

  return { orderBookList: newBids, baseTotal, quoteTotal };
};
