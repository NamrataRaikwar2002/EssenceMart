// @ts-nocheck
import { Navbar } from "../../components";
import { Cart } from "./component/Cart";
import { useState } from "react";
import { Address } from "./component/Address";
import { useProduct } from "../../hooks/context/productContext";

const CartPage = () => {
  const [cartPageState, setCartPageState] = useState("1");
  const [selectAddress, setSelectAddress] = useState(false);
  const {
    productState: { cart },
  } = useProduct();

  const processToPay = () => {
    switch (cartPageState) {
      case "1":
        return (
          <>
            <h2 className="productHeading">MY CART({cart.length})</h2>
            <Cart setCartPageState={setCartPageState} />
          </>
        );
      case "2":
        return (
          <div className="addressStep">
            <h2 className="productHeading">Add Address</h2>
            <Address
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
            />
          </div>
        );
    }
  };

  return (
    <main className="cart_page">
      <Navbar />
      <section className="cart_management content">{processToPay()}</section>
    </main>
  );
};

export { CartPage };
