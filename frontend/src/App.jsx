import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/footer/Footer'
import Loginpopup from "./components/Loginpopup/Loginpopup";
import Verify from './pages/verify/verify.jsx'
import MyOrders from './pages/myOrders/myOrders.jsx'
import DeliveryTracking from './components/map/DeliveryTrack.jsx'
import ViewMenu from './pages/viewMenu/viewMenu.jsx'
import { useContext } from 'react'
import { StoreContext } from './context/StoreContext.jsx'


const App = (  ) => {
  const [showLogin,setShowLogin]=useState(false); 
  const [category,setCategory]=useState("All"); 
  const [notification,setNotification] = useState([]);
  const {searchQuery} = useContext(StoreContext);


  return (
    <div className={`
    ${searchQuery?"w-full h-full inset-0 bg-opacity-100 bg-black/30 z-[9999] object-cover":""}`}>

       <div className='app' > 
     {showLogin ?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
     <Navbar setShowLogin={setShowLogin} notification={notification} category={category} setCategory={setCategory} />

    <Routes>
      <Route path='/' element={<Home category={category} setCategory={setCategory}/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/Placeorder' element={<Placeorder notification={notification} setNotification={setNotification}/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myOrders' element={<MyOrders/>}/>
      <Route path='/viewmenu' element={<ViewMenu/>}/>
      <Route path='/track/:orderId' element={<DeliveryTracking/>}/>
    </Routes>
    
    </div>
    <Footer/> 
    
    </div>
  )
}

export default App;