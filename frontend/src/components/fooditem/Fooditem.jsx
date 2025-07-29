import React, { useContext } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';


const Fooditem = ({id,name,price,description,image}) => {
   const {cartItem,addCart,removeCart,url}= useContext(StoreContext);
  return (
  
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/image/"+image} alt=""/>
          {!cartItem?.[id]
             ?<img className='add' onClick={()=>addCart(id)} src={assets.add_icon_white} alt=" "/>:<div className='food-item-counter'>
              <img onClick={()=>removeCart(id)}src={assets.remove_icon_red } alt=""/>
              <p>{cartItem[id] || 0}</p>
              <img onClick={()=>addCart(id)}
              src={assets.add_icon_green} alt=""/>
            
             </div>
          

          }   
          
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>RS.{price}</p>
                
        </div>
      
    </div>
    
  )
}

export default Fooditem;