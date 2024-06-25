import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../Components/navbar";
import { Login, Register } from "../Auth";
import { Home, Product, AboutPage, ContactPage, Cart, Checkout,OrderDetails } from "../Pages";

export default function MainRoutes() {
  // Assuming you have some authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Function to simulate authentication (replace this with your actual authentication logic)
  useEffect(() => {
    // Implement your authentication check here
    // For simplicity, let's use a local storage variable as an example
    const storedToken = localStorage.getItem("userId");
    console.log("useridtoken", storedToken);
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Provider store={store}>
      <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Routes */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/products" element={<Product />} />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />} />
          <Route exact path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />} />

          {/* Route for order details */}
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </>
    </Provider>
  );
}
