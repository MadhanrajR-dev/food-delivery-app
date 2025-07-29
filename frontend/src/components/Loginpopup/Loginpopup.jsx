import React, {  useContext, useState } from "react";
import "./loginpopo.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Loginpopup = ({ setShowLogin }) => {

  const {url,setToken}=useContext(StoreContext)
  const [currState, setCurrState] = useState("sign in");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
    const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin= async(event)=>{
    event.preventDefault();
    let newUrl=url;
    if(currState==="Login"){
      newUrl +="/api/user/login";
    }
    else{
      newUrl+="/api/user/register";
    }
    const response= await axios.post(newUrl,data);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);

    }
    else{
      alert(response.data.message);
    }
  }
return (
   <div className="fixed z-10 inset-0 w-full h-full bg-black/30 grid">
<form
  onSubmit={onLogin}
  action=""
  className="place-self-center w-[min(60vw,330px)] text-black 
             bg-white/30 backdrop-blur border border-white/4 
             flex flex-col gap-[10px] px-[30px] py-[25px] 
             rounded-[8px] text-sm shadow-xl"
>

    <div className="flex justify-between mb-1 items-center text-black">
      <h2>{currState}</h2>
      <img
        onClick={() => setShowLogin(false)}
        src={assets.cross_icon}
        alt=""
         className="w-4 cursor-pointer mt-6 pb-5 outline-none text-orange-500 hover:text-red-500"
      />
    </div>

    <div className="flex flex-col gap-[20px]">
      {currState === "Login" ? null : (
        <input
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          type="text"
          placeholder="your name"
          required
          className="outline-none border border-[#c9c9c9] p-[10px] rounded"
        />
      )}

      <input
        name="email"
        onChange={onChangeHandler}
        value={data.email}
        type="email"
        placeholder="your email"
        required
        className="outline-none border border-[#c9c9c9] p-[10px] rounded"
      />
      <input
        name="password"
        onChange={onChangeHandler}
        value={data.password}
        type="password"
        placeholder="password"
        className="outline-none border border-[#c9c9c9] p-[10px] rounded"
      />
    </div>

<button
  type="submit"
  className="border-none w-full max-w-[268px] p-2 sm:p-[10px] rounded text-white bg-[tomato] text-[15px] cursor-pointer"
>
  {currState === "Login" ? "Login" : "create an account"}
</button>


    <div className="flex items-start mt-[15px]">
      <input type="checkbox" required className="mt-[4px] p-[15px]" />
      <p className="ml-2">By continuing, I agree to the terms of use & privacy policy.</p>
    </div>

    {currState === "Login" ? (
      <p>
        Create a new account?
        <span
          onClick={() => setCurrState("Sign in")}
          className="text-[tomato] font-medium cursor-pointer"
        >
          {" "}
          Click here
        </span>
      </p>
    ) : (
      <p>
        Already have an account?
        <span
          onClick={() => setCurrState("Login")}
          className="text-[tomato] font-medium cursor-pointer"
        >
          {" "}
          Login here
        </span>
      </p>
    )}
  </form>
</div>

  );
};

export default Loginpopup;
