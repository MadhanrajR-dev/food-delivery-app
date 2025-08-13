import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useMemo } from "react";
import "./navbar.css";
import clsx from "clsx";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin,category}) => {
const [menu, setMenu] = useState("home");
const [showAllAfterSearch, setShowAllAfterSearch] = useState(false);


  const [serachIcon, setSearchIcon] = useState(false);
  /* const [query,setQuery] = useState(""); */
  /* const [recentSearch ,setRecentSearch] = useState([]); */
  const  {
    getTotalCartAmount,
    token,
    setToken,
    food_list,
    searchQuery,
    setSearchQuery,
    recentSearch,
    addRecentSearches,
    setRecentSearch
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const filterFood = useMemo(()=>{
  
   if (!searchQuery || !String(searchQuery).trim()) {
    
    if (showAllAfterSearch) {
      return food_list;
    }
    return category === "All"
      ? food_list
      : food_list.filter(item => item.category === category);
  }
 const queryLower = String(searchQuery).toLowerCase()
 
    return food_list
    .filter((item)=>item.name.toLowerCase().includes(queryLower))
    .sort((a,b)=>{
      const aMatch = a.name.toLowerCase().startsWith(queryLower);
      const bMatch = b.name.toLowerCase().startsWith(queryLower);
      return bMatch-aMatch;
    })
  },[food_list,searchQuery,category,showAllAfterSearch])

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Update context if token exists
    }
  }, [token, setSearchIcon]);

  const handleLogout = () => {
    setToken(null); // Clear token from context
    localStorage.removeItem("token"); // Remove token from storage
  };

  /*   const handleSearch = ()=>{
    if(query.trim()){
   setRecentSearch((prev)=>{
    const updated =prev.includes(query.trim())?prev:[query.trim(),...prev].slice(0,5);
    return updated;
   })
    }
  setQuery("");
    } */

  /* const serachFilter = food_list.sort((a,b)=>{
  const aMatch = a.name.toLowerCase().includes(query.toLowerCase());
  const bMatch = b.name.toLowerCase().includes(query.toLowerCase())

  return bMatch - aMatch;
}) */

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
        <div
          className="flex flex-wrap items-center gap-6 sm:gap-10 
  absolute right-7 top-4 sm:static sm:right-auto sm:top-auto 
  justify-end sm:justify-end w-full sm:w-auto z-50"
        >
          {/* Search Icon */}

          <div
            className={clsx(
              "flex items-center border rounded-full overflow-hidden transition-all duration-300",
              serachIcon ? "w-52 px-1" : "px-1"
            )}
          >
            <button
              onClick={() => setSearchIcon((prev) => !prev)} // toggles true/false
              className="flex-shrink-0"
            >
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-5 sm:w-4 md:w-5"
              />
            </button>

            {serachIcon && (
              <input
                type="text"
                value={searchQuery}
                placeholder="Search items..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     addRecentSearches(searchQuery);
                    setShowAllAfterSearch(true)
                     setCategory("All")
                      setSearchQuery("");  
                  }
                }}
                className="ml-2 outline-none flex-1 text-sm"
                autoFocus // focuses automatically when expanded
              />
            )}
            {serachIcon && searchQuery !== "" && recentSearch.length > 0 && (
              <div className="absolute left-0  mt-24  w-60   overflow-hidden">
                {filterFood.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                    
                      addRecentSearches(item);
                       setRecentSearch(searchQuery);
                      
                    }}
                    className="px-6 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  > 
                   
                    {item.name}
                  
                  </div>
                ))}
              </div>
            )}
          </div>

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
              className="bg-transparent text-[15px] sm:text-[14px] md:text-[13px] text-[#49557e] border border-[tomato] px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] rounded-full cursor-pointer transition duration-300 hover:bg-[#fff4f2]"
            >
              sign in
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-6 sm:w-8"
              />
              <ul className="absolute right-0 z-10 hidden group-hover:flex flex-col gap-3 bg-white p-4 min-w-[180px] rounded-lg shadow-xl border border-gray-200">
                <li
                  onClick={() => navigate("/myOrders")}
                  className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-tomato hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200"
                >
                  <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                  <p className="font-medium">Orders</p>
                </li>
                <hr className="border-t border-gray-200" />
                <li
                  onClick={logout}
                  className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-tomato hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200"
                >
                  <img
                    src={assets.logout_icon}
                    alt="Logout"
                    className="w-5 h-5"
                  />
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
