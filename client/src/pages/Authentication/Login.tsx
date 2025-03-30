// @ts-nocheck
import React, { useState } from "react";
import { Navbar } from "../../components";
import "./authentication.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/context/authContext";
import { toast } from "react-toastify";
import { API_URL } from "../../utilities/constant";

export const Login = () => {
  const navigate = useNavigate();
  const [inputType, setinputType] = useState("password");
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const { email, password } = loginUser;
  const { userDispatch } = useAuth();
  const location = useLocation();

  const guestUserHandler = (e) => {
    e.preventDefault();
    setLoginUser({
      ...loginUser,
      email: "admin@gmail.com",
      password: "admin123",
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginUserHandler(email, password);
  };

  const loginUserHandler = async (email, password) => {
    if (email && password) {
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });
        console.log(response, "userlogintoken");
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.foundUser));
          localStorage.setItem("token", response.data.token);
          userDispatch({
            type: "LOGIN",
            payload: {
              user: response.data.foundUser,
              token: response.data.token,
            },
          });
          // navigate(location?.state?.from?.pathname || -1, { replace: true })
          navigate("/product-list");
          toast.success("LoggedIn successfully  ");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.warning("Please fill the fields");
    }
  };

  return (
    <main className="login_page">
      <Navbar />
      <section className="login_box content">
        <form>
          <div className="login_div">
            <h2 className="createAccount">Login</h2>
            <label htmlFor="emailInput">Email Address</label>
            <input
              type="text"
              className="login_input"
              placeholder="Enter your email"
              id="loginInput"
              value={email}
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
              required
            />
            <label htmlFor="passwordInput">Password</label>
            <div className="showHideDiv">
              <input
                type={inputType}
                className="login_input passwordInputDiv"
                placeholder="Password"
                id="passwordInput"
                value={password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                required
              />
              <div
                onClick={() =>
                  inputType === "text"
                    ? setinputType("password")
                    : setinputType("text")
                }
              >
                {inputType === "text" ? (
                  <p className="hideIcon">
                    <i className="fa-regular fa-eye"></i>
                  </p>
                ) : (
                  <p className="hideIcon">
                    <i className="fa-regular fa-eye-slash"></i>
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="primary_btn btn"
              onClick={guestUserHandler}
            >
              Add Guest credentials
            </button>
            <button
              type="submit"
              className="primary_btn btn"
              onClick={loginHandler}
            >
              Login
            </button>
            <Link to="/signup-page" className="createAccount login_signup_link">
              Create New Account
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
