// @ts-nocheck

import { createContext, useContext, useReducer } from "react";
import { productReducer } from "../reducer/productReducer";

export type ProductState = {
  cart: any[];
  wishList: any[];
};

export type ProductAction =
  | {
      type: "ADD_TO_CART";
      payload: [];
    }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "ADD_TO_WISHLIST"; payload: [] }
  | { type: "MOVE_TO_CART"; payload: [] }
  | { type: "REMOVE_FROM_WISHLIST"; payload: [] }
  | { type: "MOVE_TO_WISHLIST"; payload: [] }
  | { type: "INCREASE_QUANTITY"; payload: [] }
  | { type: "DECREASE_QUANTITY"; payload: [] };

const productContext = createContext(null);
const useProduct = () => useContext(productContext);

const ProductProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    productReducer,
    {
      cart: [],
      wishList: [],
    }
  );
  return (
    <productContext.Provider value={{ productState, productDispatch }}>
      {children}
    </productContext.Provider>
  );
};

export { useProduct, ProductProvider };

