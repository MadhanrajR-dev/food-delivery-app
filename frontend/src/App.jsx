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
import { useParams } from 'react-router-dom'




const App = (  ) => {
  const [showLogin,setShowLogin]=useState(false); 
  const [category,setCategory]=useState("All"); 


  return (
    <>
{/*     {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>} */}

               <div className='app' > 
                    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
                <Navbar setShowLogin={setShowLogin} category={category} setCategory={setCategory} />

    <Routes>
      <Route path='/' element={<Home category={category} setCategory={setCategory}/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/Placeorder' element={<Placeorder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myOrders' element={<MyOrders/>}/>
      <Route path='/viewmenu' element={<ViewMenu/>}/>
      <Route path='/track/:orderId' element={<DeliveryTracking/>}/>
    </Routes>
    
    </div>
    <Footer/> 
    
    </>
  )
}

export default App;