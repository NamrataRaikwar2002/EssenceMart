// @ts-nocheck

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProduct } from "../../hooks/context/productContext";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/context/authContext";
import axios from "axios";
import { API_URL } from "../../utilities/constant";


type NavabarType = {
  setSearchResult: React.Dispatch<React.SetStateAction<never[]>>;
  products: never[];
  sideBar: boolean;
  setsideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  setSearchResult,
  products,
  sideBar,
  setsideBar,
}: NavabarType) => {
  const navigate = useNavigate();
  const { productState, productDispatch } = useProduct();
  const { cart, wishList } = productState;
  const { userDetail, userDispatch } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const {
    userDetail: { token },
  } = useAuth();

    useEffect(() => {
    let isMounted = true;

    const dataFetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          authorization: token
        },
      });
        const data1 = response?.data?.cart?.cart;
        if (isMounted) {
           productDispatch({
             type: "GET_CART",
             payload: data1,
           });
          console.log(response,'fwoeifwoeresponse')
        }
      
      } catch (error) {
        console.error(error, "errddddor");
      }
    };
    const getwishlist = async () => {
      try {
        const response = await axios.get(`${API_URL}/wishlist`, {
        headers: {
          authorization: token
        },
      });
        const data1 = response?.data?.products;
        if (isMounted) {
           productDispatch({
             type: "GET_WISHLIST",
             payload: data1,
           });
          
        }
      } catch (error) {
        console.error(error, "error");
      }
    };

    dataFetch();
    getwishlist();


    return () => {
      console.log("Cleaning up!");
      isMounted = false; 
    };
  }, []);

  const logutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    userDispatch({ type: "LOGOUT" });
    toast.success("LoggedOut successfully");
    navigate("/");
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value !== "") {
      const findItem = products.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResult(findItem);
    } else {
      setSearchResult(products);
    }
  };

  const hamburgurHandler = () => {
    setsideBar(!sideBar);
  };
  return (
    <div className="nav_div">
      <nav className="navigation">
        <Link to="/" className="appNameWithIcon">
          <img src="/favicon.ico" alt="fevicon" className="feviconImg" />
          <h2 className="textForPrimaryColor">EssenceMart</h2>
        </Link>
        <div className="search_icon">
          <input
            type="text"
            className="search_bar"
            placeholder="Search..."
            name="search"
            value={searchInput}
            onClick={() => navigate("/product-list")}
            onChange={(e) => searchInputHandler(e)}
          />
          <i className="fa fa-search"></i>
        </div>
        <aside className="nav_rightside">
          {location.pathname === "/product-list" ? (
            <i
              className="fa-solid fa-bars nav_icon hamburgerIcon"
              onClick={hamburgurHandler}
            ></i>
          ) : null}
          <Link
            to="/product-list"
            className="navbar_link textForPrimaryColor productsText"
          >
            Products
          </Link>
          {token ? (
            <>
              <button
                className="nav_btn navbar_link logoutBtn"
                onClick={logutHandler}
              >
                Logout
              </button>
              <i
                className="fa-solid fa-arrow-right-from-bracket logoutIcon nav_icon"
                onClick={logutHandler}
              ></i>
            </>
          ) : (
            <Link to="/login-page">
              <button className="nav_btn navbar_link">Login</button>
            </Link>
          )}
          <Link to="/wishlist-page">
            <i
              className="far fa-heart nav_icon wishlist_nav_icon"
              id="comIcon"
            ></i>
            {wishList.length > 0 && token ? (
              <p className="wishlist_icon_home_badge icon_badge">
                {wishList.length}
              </p>
            ) : null}
          </Link>
          <Link to="/cart-page">
            <i className="fas fa-shopping-cart nav_icon cart_nav_icon"></i>
            {cart?.length > 0 && token ? (
              <p className="cart_icon_home_badge icon_badge">{cart?.length}</p>
            ) : null}
          </Link>
        </aside>
      </nav>
    </div>
  );
};

export { Navbar };
