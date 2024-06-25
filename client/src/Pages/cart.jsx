import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteCartById,
} from "../redux/actions/cartAction";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);

  const EmptyCart = () => {
    return (
      <div className="t">
        <div className="">
          <div className="py-5 text-center">
            <h4 className="p-3 text-2xl">Your Cart is Empty</h4>
            <Link
              to="/products"
              className="underline underline-offset-8 hover:text-blue-400 my-3"
            >
              <i className=""></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const IncreaseItem = async (product) => {
    try {
      const cartItem = {
        productId: product.productId,
        quantity: Number(product.quantity) || 1, // Ensure it's a valid number, default to 1 if not provided
        // itemPrice: product.itemPrice,
      };
      // Make API call to increase the quantity of the item in the cart
      const response = await fetch(
        "http://localhost:8880/cart/create/increase",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to increase quantity in the cart");
      }

      // Dispatch the addToCart action to update the local Redux state
      dispatch(addToCart(product));

      console.log("Quantity increased in the cart:", product);
    } catch (error) {
      console.error("Error increasing quantity in the cart:", error.message);
    }
  };

  const decreaseItem = async (product) => {
    try {
      const cartItem = {
        productId: product.productId,
        quantity: Number(product.quantity) || 1, // Ensure it's a valid number, default to 1 if not provided
        // itemPrice: product.itemPrice,
      };
      console.log("cartItem", cartItem);
      // Make API call to decrease the quantity of the item in the cart
      const response = await fetch(
        "http://localhost:8880/cart/create/decrease",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decrease quantity in the cart");
      }

      // Dispatch the removeFromCart action to update the local Redux state
      dispatch(removeFromCart(product));

      console.log("Quantity decreased in the cart:", product);
    } catch (error) {
      console.error("Error decreasing quantity in the cart:", error.message);
    }
  };

  const deleteById = async (product) => {
    try {
      const cartItem = {
        productId: product.productId,
      };

      const response = await fetch("http://localhost:8880/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from the cart");
      }

      // Assuming you have a 'deleteCartById' action
      dispatch(deleteCartById(product));
      console.log("Item deleted from the cart:", product);
    } catch (error) {
      console.error("Error deleting item from the cart:", error.message);
    }
  };

  const fetchCartFromDatabase = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      const response = await fetch(`http://localhost:8880/cart/${userId}`);

      if (!response.ok) {
        console.error(
          "Server responded with an error:",
          response.status,
          response.statusText
        );
        setError("Server error");
        return;
      }

      const data = await response.json();
      console.log("datvyvy", data.data[0].items);
      if (!data.success) {
        console.error("Error fetching cart:", data.message);
        setError("Error fetching cart");
        return;
      }
      setCartId(data.data[0]._id);
      setCartData(data.data[0].items);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
      setError("Error fetching cart");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCartFromDatabase();
        // If you have a specific action to update the local state with the fetched cart data, use it here.
        // For example:
        // dispatch(updateCartWithData(cartData));
      } catch (error) {
        // Handle errors as needed
        console.error("Error in useEffect:", error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [dispatch]);

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cartData.forEach((item) => {
      subtotal += item.itemPrice * item.quantity;
      totalItems += item.quantity;
    });
    return (
      <>
        <section className="h-auto">
          <div className="py-5 flex justify-between my-4 max-md:flex-col max-md:items-center">
            <div className="card rounded-lg border-2 w-2/3 max-md:w-72 m-2 ">
              <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
                <h5 className="mb-0">Item List </h5>
                <p className="text-sm">{cartId}</p>
              </div>
              <div className="card-body">
                {cartData.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-center m-3 px-4 max-md:flex-col">
                      <div className=" rounded-xl m-1 p-1">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={75}
                        />
                      </div>

                      <div className="m-1 p-1">
                        <p className="text-xl font-semibold ">{item.title}</p>
                      </div>

                      <div className="flex flex-col">
                        <div
                          className="flex mb-4 m-1"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            className="px-3"
                            onClick={() => decreaseItem(item)}
                          >
                            -
                          </button>

                          <p className="mx-5">{item.quantity}</p>

                          <button
                            className="px-3"
                            onClick={() => IncreaseItem(item)}
                          >
                            +
                          </button>
                        </div>
                        <div className="m-1 p-1">
                          <p className="text-xl font-semibold">
                            <span className="">{item.quantity}</span> x $
                            {item.itemPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {" "}
                      <button
                        className="flex justify-center items-center border-2 m-6 text-xl p-2 rounded-xl bg-gray-200 font-normal"
                        onClick={() => deleteById(item)}
                      >
                        delete items
                      </button>
                    </div>
                    <hr className="my-3" />
                  </div>
                ))}
              </div>
            </div>

            <div className="card rounded-lg border-2 w-1/3 max-md:w-72  m-2">
              <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="p-2 py-4 text-xl">
                  <li className="flex justify-between items-center border-0 px-6 pb-2">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="flex justify-between items-center border-0 px-6 pb-2">
                    Shipping<span>${shipping}</span>
                  </li>
                  <li className="flex justify-between items-center border-0 px-6 pb-2 font-semibold">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>

                <Link
                  to="/checkout"
                  className="flex justify-center items-center border-2 m-6 text-2xl p-3 rounded-xl bg-black text-white hover:bg-gray-500 font-semibold"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="font-light">
        <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
          Cart
        </p>
        <hr className="my-9" />
        {cartData && cartData.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </div>
  );
};

export default Cart;
