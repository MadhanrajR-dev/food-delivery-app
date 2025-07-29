import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Update context if token exists
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null); // Clear token from context
    localStorage.removeItem("token"); // Remove token from storage
  };

  return (
    <div className="w-full px-4 py-4 bg-white shadow-none sm:shadow-none sm:pt-2 md:shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-[120px] sm:w-[150px]"
            />
          </Link>
        </div>

        {/* Menu - visible on all devices, vertical on small, horizontal on large */}
        <ul className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-[#49557e] text-[16px] sm:text-[18px] mt-4 sm:mt-0 list-none">
          <Link to="/" onClick={() => setMenu("home")}>
            <span
              className={`pb-[2px] border-b-2 ${
                menu === "home" ? "border-[#49557e]" : "border-transparent"
              } inline-block`}
            >
              home
            </span>
          </Link>
          <a href="#exeplore-menu" onClick={() => setMenu("menu")}>
            <span
              className={`pb-[2px] border-b-2 ${
                menu === "menu" ? "border-[#49557e]" : "border-transparent"
              } inline-block`}
            >
              menu
            </span>
          </a>
          <a href="#app-download" onClick={() => setMenu("mobile-app")}>
            <span
              className={`pb-[2px] border-b-2 ${
                menu === "mobile-app"
                  ? "border-[#49557e]"
                  : "border-transparent"
              } inline-block`}
            >
              mobile-app
            </span>
          </a>
          <a href="#footer" onClick={() => setMenu("contact us")}>
            <span
              className={`pb-[2px] border-b-2 ${
                menu === "contact us"
                  ? "border-[#49557e]"
                  : "border-transparent"
              } inline-block`}
            >
              contact us
            </span>
          </a>
        </ul>

        {/* Right section */}
       <div className="flex flex-wrap items-center gap-6 sm:gap-10 
  absolute right-7 top-4 sm:static sm:right-auto sm:top-auto 
  justify-end sm:justify-end w-full sm:w-auto z-50">

  {/* Search Icon */}
  <img
    src={assets.search_icon}
    alt="Search"
    className="w-5 sm:w-4 md:w-5"
  />

  {/* Cart Icon */}
  <div className="relative">
    <Link to="/cart">
      <img src={assets.basket_icon} alt="Cart" className="w-5 sm:w-6" />
    </Link>
    {getTotalCartAmount() !== 0 && (
      <div className="absolute min-w-[10px] min-h-[10px] bg-[tomato] rounded-[5px] -top-2 -right-2"></div>
    )}
  </div>

  {/* Login / Profile */}
  {!token ? (
    <button
      onClick={() => setShowLogin(true)}
      className="bg-transparent text-[15px] sm:text-[14px] md:text-[13px] text-[#49557e] border border-[tomato] px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] rounded-full cursor-pointer transition duration-300 hover:bg-[#fff4f2]">
      sign in
    </button>
  ) : (
    <div className="relative group">
      <img src={assets.profile_icon} alt="Profile" className="w-6 sm:w-8" />
      <ul className="absolute right-0 z-10 hidden group-hover:flex flex-col gap-3 bg-white p-4 min-w-[180px] rounded-lg shadow-xl border border-gray-200">
        <li
          onClick={() => navigate("/myOrders")}
          className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-tomato hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200">
          <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
          <p className="font-medium">Orders</p>
        </li>
        <hr className="border-t border-gray-200" />
        <li
          onClick={logout}
          className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-tomato hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200">
          <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
          <p className="font-medium">Logout</p>
        </li>
      </ul>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Navbar;
