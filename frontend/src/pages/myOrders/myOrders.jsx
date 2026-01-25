import React, { useContext, useEffect, useState } from "react";
import "./myOrder.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]); // Renamed to 'orders' for clarity
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // Fetch all user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrder`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle typing in textarea
  const onChange = (orderId, value) => {
    setComment((prev) => ({ ...prev, [orderId]: value }));
  };

  // Submit comment
  const onSubmitComment = async (e, orderId) => {
    e.preventDefault();
    const text = (comment[orderId] ?? "").toString().trim();
    console.log(text);
    
    if (!text) {
      alert("Please enter a comment");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/comment`,
        { userId: orderId, comment: text },
        { headers: { token } }
      );

      if (response.data.success) {
        alert("Comment successfully added!");
        // Update orders state instantly
       setOrders((prevOrders) =>
  prevOrders.map((order) => {
    return order._id === orderId
      ? {
          ...order,
          rating: [
            ...(order.rating || []), { comment: text }],
        }
      : order;
  })
 
  
);

  setComment((prev) => ({ ...prev, [orderId]: "" }));
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
   const deleteUserComment = async (orderId,commentIndex)=>{
    try{
      const deleteIndex = orders.find((o)=>
       o._id === orderId )?.rating?.[commentIndex].comment
     const response = await axios.post(`${url}/api/order/deleteComment`,
      {userId:orderId,comment:deleteIndex},
      {
        headers:{token}
      }
     )
     if(response.data.success){
     setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  rating: order.rating.filter((_, i) => i !== commentIndex),
                }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

 useEffect(()=>{
 const savedComments = JSON.parse(localStorage.getItem("comment")) || [];
  setComment(savedComments);
 },[])
 useEffect(()=>{
 localStorage.setItem("comment",JSON.stringify(comment));
 },[])
  useEffect(() => {
    if (token) fetchOrders();  
  },
   [token]
);


  return (
    <div className="my-orders max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-gray-800">My Orders</h1>

      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition bg-white p-5"
            >
              {/* Order Items */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex gap-2 overflow-x-auto">
                  {order.items.map((item, i) => (
                    <img
                      key={i}
                      src={`${url}/image/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i < order.items.length - 1 && " , "}
                      </span>
                    ))}
                  </p>
                  <p className="text-gray-700 mt-1">
                    ₹{order.amount}.00 • {order.items.length} items
                  </p>
                  <p className="mt-1">
                    <span className="text-green-600 font-semibold">
                      ● {order.status}
                    </span>
                  </p>
                </div>

                <button 
                  onClick={() => navigate(`/track/${order._id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Track Order
                </button>
              </div>

              {/* Comments */}
              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Comments:
                </h3>
                <div className="space-y-2">
                  {order.rating && order.rating.length > 0 ? (
                    order.rating.map((r, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-3 rounded-lg border"
                      >
                        <span>{r.comment}</span>
                         <button
                          onClick={() => deleteUserComment(order._id, index)}
                          className="px-4 text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                      
                    ))
                  ) : (
                    <p className="text-gray-500 ">No comments yet.</p>
                  )}
                </div>
              </div>

              {/* Comment Form */}
              <form
                onSubmit={(e) => onSubmitComment(e, order._id)}
                className="mt-4 flex gap-2"
              >
                <textarea
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Write a comment..."
                  value={comment[order._id] || ""}
                  onChange={(e) => onChange(order._id, e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Comment
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
