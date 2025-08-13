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



const Home = () => <h1></h1>;

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
        <Route path="/orders" element={<Orders url={url}/>} />
        <Route path='/menu' element={<AddMenu url={url}/>}/>
        </Routes>
      </div>
      </div>
  );
};

export default App;
