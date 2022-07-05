/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderBookItemModel } from 'lib/core/models';

const isLast = (array: any[], index: number): boolean => index === array.length - 1;
const nextPrice = (array: any[], index: number): Price => array[index + 1][0];

export const insertOrderBookUpdates = (
  oldOrderBookItems: OrderBookItemModel[],
  newItems: [Price, TradeVolume][],
): [Price, TradeVolume][] => {
  if (oldOrderBookItems.length === 0) {
    return newItems.filter(([, baseVolume]) => !!baseVolume);
  }

  const orderBookItems: [Price, TradeVolume][] = oldOrderBookItems.map((model) => [model.price, model.base]);

  newItems.forEach(([newPrice, newBaseVolume]: number[]) => {
    oldOrderBookItems.forEach(({ price: oldPrice }, index, arr) => {
      if (newPrice === oldPrice) {
        if (newBaseVolume !== 0) {
          orderBookItems.splice(index, 1, [newPrice, newBaseVolume]); // replace with new quantity
        } else {
          orderBookItems.splice(index, 1); // delete
        }
      } else if (
        oldPrice > newPrice &&
        newBaseVolume !== 0 &&
        (isLast(arr, index) || nextPrice(arr, index) < newPrice)
      ) {
        orderBookItems.splice(index + 1, 0, [newPrice, newBaseVolume]); // insert between
      } else if (oldPrice < newPrice && index === 0 && newBaseVolume !== 0) {
        orderBookItems.unshift([newPrice, newBaseVolume]); // insert first
      }
    });
  });

  return orderBookItems;
};
