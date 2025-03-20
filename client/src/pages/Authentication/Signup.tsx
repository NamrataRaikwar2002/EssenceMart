// @ts-nocheck
import React, { useState } from 'react'
import { Navbar } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/context/authContext';
import { API_URL } from '../../utilities/constant'


export const Signup = () => {
  const [inputType, setinputType] = useState({
    passwordType: 'password',
    confirmpaswd: 'password',
  })
  const [signupUser, setSignupUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const { userDispatch } = useAuth()
  const { firstName, lastName, email, password, confirmPassword } = signupUser

  const signupHandler = (e) => {
    e.preventDefault()
    signupUserHandler(email, password, firstName, lastName)
  }

  const checkPassword = () => {
    if (password !== confirmPassword) {
      toast.error('The passwords entered do not match')
    } else {
      return true
    }
  }

  const signupUserHandler = async (email, password, firstName, lastName) => {
    if (firstName && lastName && email && password && confirmPassword) {
      if (checkPassword()) {
        try {
          const response = await axios.post(`${API_URL}/api/auth/signup`, {
            email,
            password,
            firstName,
            lastName
          })
          if (response.status === 201) {
            localStorage.setItem(
              'user',
              JSON.stringify(response.data.createdUser),
            )
            localStorage.setItem('token', response.data.token)
            navigate(-2)
            userDispatch({
              type: 'SIGNUP',
              payload: {
                user: response.data.createdUser,
                token: response.data.encodedToken,
              },
            })
            toast.success(
              'Congratulations, your account has been successfully created!',
            )
          } else {
            toast.error('Something went wrong')
          }
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      toast.warning('Please fill the fields')
    }
  }

  return (
    <main className="login_page">
      <Navbar />
      <section className="login_box content">
        <form>
          <div className="login_div">
            <h2 className="createAccount">Signup</h2>
            <label htmlFor="firstNameinput">First Name</label>
            <input
              type="text"
              className="login_input"
              placeholder="Enter you first name"
              id="firstNameinput"
              value={firstName}
              onChange={(e) =>
                setSignupUser({ ...signupUser, firstName: e.target.value })
              }
              required
            />
            <label htmlFor="lastNameinput">Last Name</label>
            <input
              type="text"
              className="login_input"
              placeholder="Enter your last name"
              id="lastNameinput"
              value={lastName}
              onChange={(e) =>
                setSignupUser({ ...signupUser, lastName: e.target.value })
              }
              required
            />
            <label htmlFor="emailinput">Email address</label>
            <input
              type="email"
              className="login_input"
              placeholder="Enter your email"
              id="emailinput"
              value={email}
              onChange={(e) =>
                setSignupUser({ ...signupUser, email: e.target.value })
              }
              required
            />
            <label htmlFor="passwordinput">Password</label>
            <div className="showHideDiv">
              <input
                type={inputType.passwordType}
                className="login_input passwordInputDiv"
                placeholder="Enter Password"
                id="passwordinput"
                value={password}
                onChange={(e) =>
                  setSignupUser({ ...signupUser, password: e.target.value })
                }
                required
              />
              <div
                onClick={() =>
                  inputType.passwordType === 'text'
                    ? setinputType({ ...inputType, passwordType: 'password' })
                    : setinputType({ ...inputType, passwordType: 'text' })
                }
              >
                {inputType.passwordType === 'text' ? (
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

            <label htmlFor="confirmPswdinput">Confirm Password</label>
            <div className="showHideDiv">
              <input
                type={inputType.confirmpaswd}
                className="login_input passwordInputDiv"
                placeholder="Reenter Password"
                id="confirmPswdinput"
                value={confirmPassword}
                onChange={(e) =>
                  setSignupUser({
                    ...signupUser,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              {
                <div
                  onClick={() =>
                    inputType.confirmpaswd === 'text'
                      ? setinputType({ ...inputType, confirmpaswd: 'password' })
                      : setinputType({ ...inputType, confirmpaswd: 'text' })
                  }
                >
                  {inputType.confirmpaswd === 'text' ? (
                    <p className="hideIcon">
                      <i className="fa-regular fa-eye"></i>
                    </p>
                  ) : (
                    <p className="hideIcon">
                      <i className="fa-regular fa-eye-slash"></i>
                    </p>
                  )}
                </div>
              }
            </div>
            <button
              type="submit"
              className="primary_btn btn"
              onClick={signupHandler}
            >
              Create New Account
            </button>
            <Link to="/login-page" className="createAccount login_signup_link">
              Already have an account
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

