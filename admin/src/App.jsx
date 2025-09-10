import React from "react";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddMenu from "./pages/menu/menu.jsx";
import MenuList from "./menuList/menuList.jsx";



export const Home = () =>{
return (
  <>
   
    <div className="relative min-h-screen w-full  flex flex-col items-center justify-center text- overflow-hidden">
    
      {/* Background animation circles */}
      

      {/* Main content */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeIn">
        Welcome to <span className="text-yellow-400">Our Platform</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl animate-fadeIn delay-500">
        Discover amazing features and seamless experience. Get started now and explore the possibilities!
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 animate-fadeIn delay-1000">
        <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition transform hover:-translate-y-1 hover:scale-105">
          Get Started
        </button>
        <button className="px-6 py-3 bg-transparent border-2 border-white text-black font-semibold rounded-lg shadow-lg hover:bg-white hover:text-gray-900 transition transform hover:-translate-y-1 hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
    </>
  );
} 

const App = () => {
const url= 'https://mern-project-6v4y.onrender.com' /* 'http://localhost:4000' */;
  return (
    <div >
      <ToastContainer />
      <Navbar />
       <div className="app-content">
        <Sidebar />
        <Routes>
      <Route path="/" element={<Home url={url} />} />
        <Route path="/add" element={<Add url={url} />} />
        <Route path="/list" element={<List url={url} />} />
        <Route path='/menulist' element={<MenuList url={url}/>}/>
        <Route path="/orders" element={<Orders url={url}/>} />
        <Route path='/menu' element={<AddMenu url={url}/>}/>
        </Routes>
      </div>
      </div>
      
  );
};

export default App;
