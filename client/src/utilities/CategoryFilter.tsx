// @ts-nocheck
const CategoryFilter = (
  products,
  { Deodorant, Perfume, Fragrance, BodySpray }
) => {
  let allCategoryList = [];
  if (
    Deodorant === false &&
    Perfume === false &&
    Fragrance === false &&
    BodySpray === false
  ) {
    allCategoryList = products;
  }
  if (Deodorant) {
    allCategoryList = allCategoryList.concat(
      products.filter((item) => item.category === "Deodorant")
    );
  }
  if (Perfume) {
    allCategoryList = allCategoryList.concat(
      products.filter((item) => item.category === "Perfume")
    );
  }
  if (Fragrance) {
    allCategoryList = allCategoryList.concat(
      products.filter((item) => item.category === "Fragrance")
    );
  }
  if (BodySpray) {
    allCategoryList = allCategoryList.concat(
      products.filter((item) => item.category === "BodySpray")
    );
  }
  return allCategoryList;
};

export { CategoryFilter };
