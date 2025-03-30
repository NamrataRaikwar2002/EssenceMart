// @ts-nocheck
const filterReducer = (filterState, filterAction) => {
  switch (filterAction.type) {
    case "HIGH_TO_LOW":
      return { ...filterState, sortBy: filterAction.type };

    case "LOW_TO_HIGH":
      return { ...filterState, sortBy: filterAction.type };

    case "RATING":
      return { ...filterState, rating: filterAction.payload };
    case "PRICE":
      return { ...filterState, priceValue: filterAction.payload };
    case "DEODORANT":
      return { ...filterState, Deodorant: filterAction.payload };
    case "PERFUME":
      return { ...filterState, Perfume: filterAction.payload };
    case "FRAGRANCE":
      return { ...filterState, Fragrance: filterAction.payload };
    case "CLEAR_CATEGORY":
      let updatedCategory = { ...filterState };
      const categories = Object.entries(filterState).filter(
        ([key, value]) => typeof value === "boolean"
      );
      const formCategoryObj = Object.fromEntries(categories);
      for (let key in formCategoryObj) {
        if (formCategoryObj[key] == true) {
          updatedCategory = { ...formCategoryObj, [key]: false };
          return { ...filterState, ...updatedCategory };
        } else {
          return { ...filterState };
        }
      }

    case "BODYSPRAY":
      return { ...filterState, BodySpray: filterAction.payload };

    case "CLEAR":
      return {
        ...filterState,
        priceValue: 2000,
        sortBy: "",
        rating: "",
        Deodorant: false,
        Perfume: false,
        Fragrance: false,
        BodySpray: false,
      };

    default:
      return filterState;
  }
};

export { filterReducer };
