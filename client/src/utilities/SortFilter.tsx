// @ts-nocheck
const SortFilter = (products, { sortBy }) => {
  if (sortBy === 'HIGH_TO_LOW') {
    return [...products].sort((a, b) => Number(b.price) - Number(a.price))
  } else if (sortBy === 'LOW_TO_HIGH') {
    return [...products].sort((a, b) => Number(a.price) - Number(b.price))
  } else {
    return products
  }
}

export { SortFilter }

