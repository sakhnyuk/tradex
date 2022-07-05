/* eslint-disable no-param-reassign */
const isLast = (index: number, array: any[]) => index === array.length - 1;
const nextPrice = (array: any[], index: number) => array[index + 1][0];

export default (oldAsks: number[][], updateAsks: number[][]) => {
  let newAsks = [...oldAsks];

  if (newAsks.length === 0) {
    newAsks = updateAsks.filter(([, quantity]) => quantity);
  }

  updateAsks.forEach(([updatePrice, updateQuantity]: number[]) => {
    newAsks.forEach(([oldPrice], index, asks) => {
      if (updatePrice === oldPrice) {
        if (updateQuantity !== 0) {
          asks.splice(index, 1, [updatePrice, updateQuantity]); // replace with new quantity
        } else {
          asks.splice(index, 1); // delete
        }
      } else if (
        oldPrice > updatePrice &&
        updateQuantity !== 0 &&
        (isLast(index, asks) || nextPrice(asks, index) < updatePrice)
      ) {
        asks.splice(index + 1, 0, [updatePrice, updateQuantity]); // insert between
      } else if (oldPrice < updatePrice && index === 0 && updateQuantity !== 0) {
        asks.unshift([updatePrice, updateQuantity]); // insert first
      }
    });
  });

  return newAsks;
};
