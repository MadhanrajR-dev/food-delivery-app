import  { useContext, useEffect } from "react";
import "./placeorder.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messaging } from "../../firebaseConfig.js";
import { onMessage,getToken } from "firebase/messaging";
import {Bell} from 'lucide-react';
import axios from "axios";
import {motion,AnimatePresence} from 'framer-motion'

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);
      const [token_fcm,setToken_fcm] = useState(null);
      const [notification,setNotification] = useState([]);
      const [showPopup,setShowPopup] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
    const getTokenFCM = async ()=>{
      try{
        const currentToken = await getToken(messaging,{
         vapidKey:"BJaCVlPk2rtyvZVHINMRXmFq7kHIF2PoabZtauusqaqlZbScEUSw5TZz1itfV9vOwIsx6-qzlkDC3HRO_Ypo9kU"
        }) 
        console.log(currentToken);
        
        if(currentToken){
         console.log("token received",currentToken);
         setToken_fcm(currentToken);
         
        }else{
         console.log("failed to get token");
         
        }
      }catch(error){
       console.log("Error",error);
       
      }
   };

  const placeOrder = async (e) => {
    e.preventDefault();
    let token1 = token_fcm;
   
   if(!token1){
   token1 = await getTokenFCM();
   if(!token1){
    alert("permission is deinied to get tokenfcm");
   }
   } 
    
    let orderItems = [];

    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    

    let orderdata = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      tokenfcm:token1,

    };
    let phone = {
      phone:data.phone,
      name:data.firstName

    }
    console.log("Order Data: ", orderdata);

    let response = await axios.post(url + "/api/order/place", orderdata, {
      headers: { token },
    });
    if(response.data.success){
      await axios.post(`${url}/api/order/sms`,phone,{
        headers:{
          token
        }
      })
    }
    if (response.data.success) {
      const razorOrder = response.data.order;
      localStorage.setItem("razor_order_id", razorOrder.id);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_live_majG3mDVDe70ve",
          amount: razorOrder.amount,
          currency: razorOrder.currency,
          name: "Tomotao",
          description: "order payment",
          order_id: razorOrder.id,
          handler: function (response) {
            alert("payment successfull");
            window.location.href = `/verify?success=true&paymentId=${response.razorpay_payment_id}`;
            
          },

          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          notes: {
            address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`,
            notes: {
              items: JSON.stringify(cartItem),
              user: "Madhan Raj",
            },
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
     
      
    } else {
      alert("error");
    }
   
  };
   const navigate = useNavigate();

useEffect(() => {
   const initFCM = async ()=>{
     const permission = await Notification.requestPermission();
     console.log(permission);
     if(permission === "granted"){
       await getTokenFCM();
     }
     
   }
   initFCM();
   onMessage(messaging,(payload)=>{
     console.log("new FCM message",payload);
/*      alert(payload.notification.title+ ":"+payload.notification.body) */
      const{title,body} = payload.notification;
      setNotification((prev)=>[
        ...prev,{id:Date.now(),title,body}
      ])
      setShowPopup(true);
      setTimeout(()=>setShowPopup(false),3000);
   })
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
    <form
  onSubmit={placeOrder}
  className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[100px] mt-10 px-4 sm:px-8"
>
  {/* Left Section */}
  <div className="w-full lg:max-w-[min(30%,500px)]">
    <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold mb-8">
      Delivery Information
    </p>

    <div className="flex flex-col sm:flex-row gap-[10px]">
      <input
        required
        name="firstName"
        onChange={onChangeHandle}
        value={data.firstName}
        type="text"
        placeholder="First name"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
      <input
        required
        name="lastName"
        onChange={onChangeHandle}
        value={data.lastName}
        type="text"
        placeholder="Last name"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
    </div>

    <input
      required
      name="email"
      onChange={onChangeHandle}
      value={data.email}
      type="email"
      placeholder="Enter Email"
      className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
    />

    <input
      required
      name="street"
      onChange={onChangeHandle}
      value={data.street}
      type="text"
      placeholder="Street"
      className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
    />

    <div className="flex flex-col sm:flex-row gap-[10px]">
      <input
        type="text"
        name="city"
        onChange={onChangeHandle}
        value={data.city}
        placeholder="City (optional)"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
      <input
        required
        type="text"
        name="state"
        onChange={onChangeHandle}
        value={data.state}
        placeholder="State"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-[10px]">
      <input
        required
        type="text"
        name="zipcode"
        onChange={onChangeHandle}
        value={data.zipcode}
        placeholder="Zip code"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
      <input
        required
        type="text"
        name="country"
        onChange={onChangeHandle}
        value={data.country}
        placeholder="Country"
        className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
      />
    </div>

    <input
      required
      type="text"
      name="phone"
      onChange={onChangeHandle}
      value={data.phone}
      placeholder="Phone Number"
      className="mt-4 w-full p-[10px] border border-[#c5c5c5] rounded outline-[tomato]"
    />
  </div>
<div className="w-full sm:text-lg max-w-md mx-auto mt-4 px-4">
  <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Cart Totals</h2>

    {/* Subtotal */}
    <div className="flex justify-between items-center text-sm sm:text-base">
      <p className="text-gray-700">Subtotal</p>
      <p className="text-gray-900 font-medium">
        ₹{getTotalCartAmount()}
      </p>
    </div>

    <hr />

    {/* Delivery Fee */}
    <div className="flex justify-between items-center text-sm sm:text-base">
      <p className="text-gray-700">Delivery Fee</p>
      <p className="text-gray-900 font-medium">
        ₹{getTotalCartAmount() === 0 ? 0 : 2}
      </p>
    </div>

    <hr />

    {/* Total */}
    <div className="flex justify-between items-center font-bold text-sm sm:text-base">
      <p>Total</p>
      <p className="font-bold text-gray-900">
        ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
      </p>
    </div>

    {/* Proceed Button */}
    <button
      type="submit"
      className="w-full mt-4 bg-[tomato] text-white py-3 rounded-md hover:opacity-90 transition duration-200 text-sm sm:text-base"
    >
      PROCEED TO PAYMENT
    </button>
  </div>
</div>



</form>
<div className="fixed top-5  right-56 z-50 ">
  <div className="relative">
  <Bell className="w-9 h-9 text-white bg-blue-600 rounded-full" onClick={()=>setShowPopup(!showPopup)} />
        <AnimatePresence>
          {notification.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
            >
              {notification.length}
            </motion.span>
          )}
        </AnimatePresence>
    </div>

{/* show popu menu */}

 <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg overflow-hidden border"
          >
            {notification.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 3 }}
                transition={{ duration: 0.2 }}
                className="p-3 border-b border-gray-200"
              >
                <h4 className="font-bold">{n.title}</h4>
                <p className="text-sm text-gray-700">{n.body}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
</div>
</div>

  );
};

export default Placeorder;
