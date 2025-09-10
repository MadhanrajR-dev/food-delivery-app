import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import React from 'react'

function MenuList() {
  const url = "http://localhost:4000";
  const [list, setMenuList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(url + "/api/menu/all");

      if (response.data.success) {
        setMenuList(response.data.data);
      } else {
        toast.error("Fetching food failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("network error");
    }
  };

  const removeMenu = async (menuId) => {
    try {
      const response = await axios.post(`${url}/api/menu/removeMenu`, {
        id: menuId,
      });

     /*  if (response.data.sucess) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      } */
      if (response.data.success) {
        setMenuList((prevList) => prevList.filter((item)=>item._id !== menuId));
        toast.success("food removed");
      } else {
        toast.error("error");
      }
    } catch (error) {
      toast.error("failed to remove");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="px-28 py-10">
    <p className="mb-4 font-semibold text-lg">All Menu List</p>
  
    {/* Title Row */}
    <div className="grid  grid-cols-[1fr_1fr_1.2fr_1.2fr_0.5fr] items-center gap-5 pl-[30px] p-4 border border-[#cacaca] text-sm bg-[#f9f9f9] font-bold justify-evenly max-[600px]:hidden">
      <h1>Menu Name</h1>
      <h1>Menu Image</h1>
      <h1>Extra Info</h1>
      <h1>remove food</h1>
    </div>
  
    {/* List */}
    <div className="grid grid-cols-[1fr_1fr_1.2fr_1.2fr_0.5fr] items-center gap-5 pl-[30px] p-[10px] border border-[#cacaca] text-sm max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-[15px]">
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item.name}</span>
          <img src={`${url}/image/${item.image}`} alt='' className="w-[50px]" />
          <span className="col-span-2">Extra Info</span>
          <p
            onClick={() => removeMenu(item._id)}
            className="cursor-pointer text-red-500 font-bold text-center"
          >
            X
          </p>
        </React.Fragment>
      ))}
    </div>
  </div>
  
  );
}

export default MenuList;
