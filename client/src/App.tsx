// @ts-nocheck
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { CartPage, Home, Login, ProductList, Signup, Wishlist } from './pages'
import { RequiresAuth } from './RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/mock" element={<MockmanEs />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/login-page" element={<Login />} />
        <Route
          path="/wishlist-page"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/cart-page"
          element={
            <RequiresAuth>
              <CartPage />
            </RequiresAuth>
          }
        />
        <Route path="/signup-page" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

