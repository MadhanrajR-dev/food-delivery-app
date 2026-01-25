import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useMemo } from "react";
import clsx from "clsx";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, category, setCategory,notification }) => {
  const [menu, setMenu] = useState(null);
  const [showAllAfterSearch, setShowAllAfterSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serachIcon, setSearchIcon] = useState(false);
  const {
    getTotalCartAmount,
    token,
    setToken,
    food_list,
    searchQuery,
    setSearchQuery,
    recentSearch,
    addRecentSearches,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const search = useDebounce(searchQuery, 3000);

  const filterFood = useMemo(() => {
    if (!searchQuery || !String(searchQuery).trim()) {
      if (showAllAfterSearch) {
        return food_list;
      }
      return category === "All"
        ? food_list
        : food_list.filter((item) => item.category === category);
    }
    const queryLower = String(searchQuery).toLowerCase();

    return food_list
      .filter((item) => item.name.toLowerCase().includes(queryLower))
      .sort((a, b) => {
        const aMatch = a.name.toLowerCase().startsWith(queryLower);
        const bMatch = b.name.toLowerCase().startsWith(queryLower);
        return bMatch - aMatch;
      });
  }, [food_list, searchQuery]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Update context if token exists
    }
  }, [token]); // token updates update phase
  const showALLFoods = () => {
    setCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="sticky top-0 z-50  m-w-full  px-4 py-3 bg-gradient-to-br from-gray-100 to-white shadow-md sm:shadow-none sm:pt-2 md:shadow-md">
      <div className="flex flex-col h-[50px]  sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="flex justify-center ">
          <Link to="/">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-[120px] md:w-[130px] sm:w-[150px]"
            />
          </Link>
        </div>
        <button
          className="flex left-4 mb-4 text-2xl block sm:hidden text-gray-500  cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        {/* Menu - visible on all devices, vertical on small, horizontal on large */}

        <AnimatePresence>
          {(isOpen || window.innerWidth >= 640) && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`sm:static mt-0 left-0 w-36 sm:w-auto
            bg-white sm:bg-transparent shadow-md sm:shadow-none flex
            flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-0
            sm:flex`}
            >
              <Link to="/">
                <span
                  className={`pb-[2px] px-2 text-black transform transition-all duration-300 hover:scale-110 ${
                    menu === "home" ? "border-[#49557e]" : "border-transparent"
                  } inline-block`}
                >
                  home
                </span>
              </Link>

              <a href="#exeplore-menu" onClick={() => setMenu("menu")}>
                <span
                  className={`pb-[2px] px-2 text-black transform transition-all duration-300 hover:scale-110 ${
                    menu === "menu" ? "border-[#49557e]" : "border-transparent"
                  } inline-block`}
                >
                  menu
                </span>
              </a>
              <a href="#app-download" onClick={() => setMenu("mobile-app")}>
                <span
                  className={`pb-[2px]  px-2 text-black transform transition-all duration-300 hover:scale-110${
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
                  className={`pb-[2px]  px-2 text-black transform transition-all duration-300 hover:scale-110 ${
                    menu === "contact us"
                      ? "border-[#49557e]"
                      : "border-transparent"
                  } inline-block`}
                >
                  contact us
                </span>
              </a>
              <button
                onClick={showALLFoods}
                className="text-gray-600 z-50  font-bold   transform  duration-300 hover:scale-110  hover:text-black hover:z-10 "
              >
                ALL FOODS
              </button>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Right section */}

        <div
          className="flex justify-evenly items-center gap-6 sm:gap-10 
   right-10 top-4 sm:static sm:right-10 sm:top-10
   sm:justify-end w-full sm:w-auto z-50"
        >
          {/* Search Icon */}
          <div
            className={clsx(
              `flex items-center border   rounded-full overflow-hidden transition-all duration-300 focus-within:border-gray-500`,
              serachIcon ? "py-4 right-22 px-2 w-64 sm:w-72" : "py-2 px-2 ",notification?"mr-10":"",
            )}
          >
            <button onClick={() => setSearchIcon((prev) => !prev)}>
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
                    setShowAllAfterSearch(true);
                    setSearchQuery("");
                  }
                }}
                className={`ml-2 flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-800   `}
                autoFocus // focuses automatically when expanded
              />
            )}

            {serachIcon && searchQuery !== "" && recentSearch.length > 0 && (
              <div
                className={`absolute mt-80 bg-white w-96 rounded-md shadow-lg 
                  overflow-y-auto h-60 z-50 transition-all duration-300`}
              >
                {filterFood.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      addRecentSearches(item);
                      /*  setRecentSearch(searchQuery); */
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
              className=" text-white text-[15px] sm:text-[14px] md:text-[13px] bg-black border border-[gray] px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] rounded-full cursor-pointer transition duration-300 hover:[tomato]"
            >
              SignIn
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
                  role="button"
                  aria-label="button1"
                  onClick={() => navigate(`/myOrders`)}
                  className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-tomato hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200"
                >
                  <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                  <p className="font-medium">Orders</p>
                </li>
                <hr className="border-t border-gray-200" />
                <li
                  role="button"
                  aria-label="button2"
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
