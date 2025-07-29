import React from "react";
import "./myOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userOrder",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
  <h1 className="text-2xl font-semibold mt-14 ml-5 mb-6">My Orders</h1>

  <div className="container w-full overflow-x-hidden flex px-2  sm:px-4 flex-col ml- gap-5 mt-6">
    {data.map((order, index) => (
      <div
        key={index}
  className="grid grid-cols-6 sm:grid-cols-3 gap-3 items-center 
        text-sm sm:text-sm md:text-base 
        p-4 sm:p-4 md:p-5 
        m-2 sm:m-4 md:m-6 
        border border-gray-200 
        shadow-sm rounded 
        hover:shadow-md hover:bg-gray-50 
        transition-all overflow-hidden"
      >
      
        <img
          src={assets.parcel_icon}
          alt="parcel icon"
          className="w-[50px]"
        />

        <p>
          {Array.isArray(order.items) &&
            order.items.map((item, i) => (
              <span key={i} className="text-tomato">
                {item.name} x {item.quantity}
                {i < order.items.length - 1 && ", "}
              </span>
            ))}
        </p>

        <p>RS.{order.amount}.00</p>
        <p>Items: {order.items.length}</p>
        <p>
          <span className="text-[tomato]">&#x25cf;</span>{" "}
          <b className="font-medium text-[#454545]">{order.status}</b>
        </p>
<button className="bg-green-500 text-white px-5 py-3 w-fit rounded cursor-pointer hover:opacity-90">
  Track Order
</button>

      </div>
    ))}
  </div>
</div>

  );
};

export default MyOrders;
