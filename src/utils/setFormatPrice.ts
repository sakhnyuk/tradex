const formatFunc = (number: number, digits: number) =>
  number.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });

export const formatPrice = (price = 0) => {
  if (isNaN(price)) {
    return 0;
  }
  if (price === null) {
    return 0;
  }
  if (price === 0) {
    return formatFunc(price, 0);
  }
  if (price >= 100000) {
    return formatFunc(price, 1);
  }
  if (price >= 10000) {
    return formatFunc(price, 2);
  }
  if (price >= 1000) {
    return formatFunc(price, 3);
  }
  if (price >= 100) {
    return formatFunc(price, 4);
  }
  if (price >= 10) {
    return formatFunc(price, 5);
  }
  if (price >= 1) {
    return formatFunc(price, 6);
  }
  if (price >= 0.01) {
    return formatFunc(price, 8);
  }
  if (price >= 0.0001) {
    return formatFunc(price, 8);
  }
  if (price >= 0.000001) {
    return formatFunc(price, 8);
  }
  return formatFunc(price, 8);
};

export const formatQuantity = (quantity = 0) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(quantity)) {
    return 0;
  }
  if (quantity === null) {
    return 0;
  }
  if (quantity === 0) {
    return formatFunc(quantity, 0);
  }
  if (quantity >= 100000) {
    return formatFunc(quantity, 1);
  }
  if (quantity >= 10000) {
    return formatFunc(quantity, 2);
  }
  if (quantity >= 1000) {
    return formatFunc(quantity, 3);
  }
  if (quantity >= 100) {
    return formatFunc(quantity, 4);
  }
  if (quantity >= 10) {
    return formatFunc(quantity, 5);
  }
  if (quantity >= 1) {
    return formatFunc(quantity, 6);
  }
  if (quantity >= 0.01) {
    return formatFunc(quantity, 6);
  }
  if (quantity >= 0.0001) {
    return formatFunc(quantity, 6);
  }
  if (quantity >= 0.000001) {
    return formatFunc(quantity, 8);
  }
  return formatFunc(quantity, 8);
};
