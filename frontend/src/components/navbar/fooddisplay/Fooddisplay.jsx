import React, { useContext } from 'react'
import "./fooddisplay.css"
import { StoreContext } from '../../../context/StoreContext.jsx'
import Fooditem from '../../fooditem/Fooditem.jsx'

const Fooddisplay = ({category}) => {
  const {food_list}=useContext(StoreContext)

  return (
    <div className='food-display' id='food-diplay'>
        <h2>Top dishes near</h2>
        <div className='food-display-list'>
            {food_list.map((item,index)=>{
              if(category==="All"|| category===item.category){
                return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
                
            })}
        </div>
      
    </div>
  )
}

export default Fooddisplay
