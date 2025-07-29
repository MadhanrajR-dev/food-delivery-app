import React, { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart overflow-x-hidden sm:overflow-x-hidden mt-[100px] px-5">
      <div className="cart-Items">
        {/* Header Row */}
        <div className="cart-item-title hidden  md:grid grid-cols-6 items-center text-gray-500 text-[max(1vw,15px)] gap-4 px-4">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr className="my-2" />

        {food_list.map((item) => {
          if (cartItem[item._id] || 0) {
            return (
              <div
                key={item._id}
                className="cart-items-item border-b border-gray-200 py-3 px-2 text-black 
                   flex flex-col gap-2 md:grid md:grid-cols-6 md:items-center md:gap-4 md:px-4"
              >
                {/* 🟢 Small Device Layout */}
               <div className="grid grid-cols-6 gap-3 items-center md:hidden px-3 w-full">
  <img
    src={url + "/image/" + item.image}
    alt=""
    className="w-14 h-14 object-cover rounded col-span-1"
  />

  <div className="col-span-4 grid grid-cols-5 gap-24 text-sm items-center">
    <p>
      <span className="font-medium text-gray-500"></span> {item.name}
    </p>
    <p>
      <span className="font-medium text-gray-500"></span> ₹{item.price}
    </p>
    <p>
      <span className="font-medium text-gray-500"></span> {cartItem[item._id]}
    </p>
    <p>
      <span className="font-medium text-gray-500"></span> ₹{item.price * cartItem[item._id]}
    </p>
        <p >
          <span  className="text-red-600 font-bold cursor-pointer" onClick={() => removeCart(item._id)}></span>
          X</p>
  </div>


  
</div>


                {/* 🔵 Desktop Layout */}
                <img
                  src={url + "/image/" + item.image}
                  alt=""
                  className="w-14 h-14 object-cover rounded hidden md:block"
                />
                <p className="hidden md:block">{item.name}</p>
                <p className="hidden md:block">₹{item.price}</p>
                <p className="hidden md:block">{cartItem[item._id]}</p>
                <p className="hidden md:block">
                  ₹{item.price * cartItem[item._id]}
                </p>
                <p
                  onClick={() => removeCart(item._id)}
                  className="text-red-600 font-bold cursor-pointer text-center hidden md:block"
                >
                  X
                </p>
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom mt-[90px] flex flex-col-reverse md:flex-row justify-between gap-[max(13vw,20px)]">
        <div className="cart-promocode w-full max-w-md mx-auto">
          <p className="text-gray-600 text-sm sm:text-base">
            If you have a promo code, enter it here
          </p>

          <div className="cart-promo mt-2 flex flex-col sm:flex-row gap-3 sm:gap-2 bg-[#eaeaea] rounded-md p-3">
            <input
              type="text"
              placeholder="Promo code"
              className="h-[38px] px-4 outline-none border-none flex-1 bg-transparent text-sm sm:text-base"
            />
            <button className="w-full sm:w-[150px] py-2 bg-black text-white rounded-md text-sm sm:text-base">
              Submit
            </button>
          </div>
        </div>

        <div className="cart-total w-full max-w-[95%] sm:max-w-sm md:max-w-md mx-auto flex flex-col gap-6 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center">
            Cart Totals
          </h2>

          <div className="text-base sm:text-base md:text-lg space-y-4">
            {/* Subtotal */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#555] gap-1">
              <span className="font-medium">Subtotal</span>
              <span className="text-right sm:text-left break-words">
                ₹{getTotalCartAmount()}
              </span>
            </div>

            {/* Delivery Fee */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#555] gap-1">
              <span className="font-medium">Delivery Fee</span>
              <span className="text-right sm:text-left break-words">
                ₹{getTotalCartAmount() === 0 ? 0 : 2}
              </span>
            </div>

            {/* Total */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-black font-semibold gap-1">
              <span>Total</span>
              <span className="text-right sm:text-left break-words">
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="mt-4 bg-[tomato] text-white w-full py-3 rounded-md text-base sm:text-lg font-semibold"
            onClick={() => navigate("/Placeorder")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
