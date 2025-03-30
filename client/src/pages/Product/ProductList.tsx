// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./Product.css";
import { Filter } from "./component/Filter";
import axios from "axios";
import { useFilter } from "../../hooks/context/filterContext";
import { useProduct } from "../../hooks/context/productContext";
import { addToCart } from "../../service/cartService/addToCart";
import { useNavigate } from "react-router";
import {
  PriceFilter,
  RatingFilter,
  SortFilter,
  CategoryFilter,
} from "../../utilities";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/context/authContext";
import { addToWishlist } from "../../service/wishlisService/addToWishlist";
import { removeFromWishlist } from "../../service/wishlisService/removeFromWishlist";
import { API_URL } from "../../utilities/constant";

export const ProductList = () => {
  const [res, setRes] = useState([]);
  const [loader, setloader] = useState(false);
  const [searchResult, setSearchResult] = useState(res || []);
  const [sideBar, setsideBar] = useState(false);
  const { productState, productDispatch } = useProduct();
  const { wishList, cart } = productState;
  const navigate = useNavigate();

  const {
    userDetail: { token },
  } = useAuth();

  const { filterState } = useFilter();
  const { priceValue } = filterState;

  useEffect(() => {
    let isMounted = true;

    const dataFetch = async () => {
      try {
        setloader(true);
        const response = await axios.get(`${API_URL}/products/`);
        console.log(response, "hereiresewe");
        if (isMounted) {
          setRes(response.data.products);
          setloader(false);
          setSearchResult(response.data.products);
        }
      } catch (error) {
        console.error(error.message, "error");
      }
    };

    dataFetch();

    return () => {
      console.log("Cleaning up!");
      isMounted = false; // ✅ Prevents state updates on unmounted components
    };
  }, []);

  const priceRangeItems = PriceFilter(searchResult, filterState);
  const ratingItems = RatingFilter(priceRangeItems, filterState);
  const categoryItem = CategoryFilter(ratingItems, filterState);
  const sortedItems = SortFilter(categoryItem, filterState);

  const addToCartHandler = (product) => {
    if (token) {
      addToCart(product, token, productDispatch);
    } else {
      navigate("/login-page");
    }
  };

  const addToWishlistHandler = (product) => {
    const checkProduct = wishList.some((item) => item._id === product._id);
    console.log(product, "producttokenherer");
    if (token) {
      if (!checkProduct) {
        addToWishlist(product, token, productDispatch);
      }
    } else {
      navigate("/login-page");
    }
  };

  const removeWishlistHandler = (_id) => {
    removeFromWishlist(_id, token, productDispatch);
  };

  return (
    <>
      <main className="product_page">
        <Navbar
          setSearchResult={setSearchResult}
          searchResult={searchResult}
          products={res}
          sideBar={sideBar}
          setsideBar={setsideBar}
        />
        <section className="all_product content">
          <Filter sideBar={sideBar} setsideBar={setsideBar} />
          <div className="product_list">
            <h3 className="productHeading">
              Total Products: {sortedItems.length}
            </h3>
            {loader ? (
              <h1 className="noItemMsg loader">Loading...</h1>
            ) : sortedItems.length !== 0 ? (
              <div className="product_list_section ">
                {sortedItems.map(
                  ({
                    productImg,
                    price,
                    title,
                    prePrice,
                    discount,
                    rating,
                    quantity,
                    _id,
                  }) => {
                    return (
                      <div className="product_list_item" key={_id}>
                        <img
                          className="productListImg"
                          src={productImg}
                          alt="images"
                        />
                        <div className="card_detail">
                          <button className="wishlist_icon">
                            {wishList.find((item) => item._id === _id) ? (
                              <i
                                className="fa-solid fa-heart"
                                onClick={() => removeWishlistHandler(_id)}
                              ></i>
                            ) : (
                              <i
                                className="far fa-heart"
                                onClick={() =>
                                  addToWishlistHandler({
                                    productImg,
                                    price,
                                    title,
                                    prePrice,
                                    discount,
                                    rating,
                                    quantity,
                                    _id,
                                  })
                                }
                              ></i>
                            )}
                          </button>
                          <p>{title}</p>
                          <div className="mrpdiv">
                            <h3>₹{price}</h3>
                            <s>₹{prePrice}</s>
                          </div>
                          <div className="discountRating">
                            <p className="green">{discount}</p>

                            <p className="ratingStarPara">
                              {rating}
                              <i className="fas fa-star star_icon"></i>
                            </p>
                          </div>
                        </div>

                        {cart.find((item) => item._id === _id) && token ? (
                          <Link to="/cart-page">
                            <button className="card_btn primary_selected_btn productAddToCartbtn goToCart">
                              Go to Cart
                            </button>
                          </Link>
                        ) : (
                          <button
                            className="card_btn primary_selected_btn productAddToCartbtn"
                            onClick={() =>
                              addToCartHandler({
                                productImg,
                                price,
                                title,
                                prePrice,
                                discount,
                                rating,
                                quantity,
                                _id,
                              })
                            }
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <h1 className="noItemMsg">No Products Available </h1>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
