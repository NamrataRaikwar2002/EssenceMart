// @ts-nocheck
const PriceFilter = (products, { priceValue }) => {
  if (priceValue) {
    return products.filter((item) => Number(item.price) <= priceValue);
  }
  return products;
};

export { PriceFilter };
