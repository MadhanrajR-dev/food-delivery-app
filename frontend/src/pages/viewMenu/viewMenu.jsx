import React, { useState } from 'react'


function ViewMenu(){
    const [open,setOpen] = useState(false)
return(
    <div className='w-full h-32'>
    <h1 className='flex justify-center  bg-green-500 shadow-md  items-center rounded-sm p-4 text-white  '>View Here Your Desier  <span className='text-lg text-sky-600'>Delicious!</span> </h1>
    <button onClick={()=>setOpen(prev=>!prev)} className='p-2 bg-green-400 m- white rounded-sm shadow-lg'>View your more food</button>
    {open && 
    <ul className='flex flex-col ml-0 p-4 h-80 z-50 bg-white rounded-md shadow-lg'>
        <li>Fruits</li>
        <li>Rice</li>
        <li>Vegetable</li>
        <li>Non-Veg</li>
        <li>Juices</li>
    </ul>
    }

    </div>
)
}

export default ViewMenu;