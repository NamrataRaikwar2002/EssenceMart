// @ts-nocheck
const RatingFilter = (products, { rating }) => {
  if (rating === "") {
    return products;
  } else {
    return products.filter((item) => Number(item.rating) >= Number(rating));
  }
};

export { RatingFilter };
