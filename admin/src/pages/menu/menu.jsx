import { useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from "../../assets/assets";

function AddMenu() {
    const [data, setData] = useState({
        name:""});
    const [file, setMenuImage] = useState(null);
const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("image", file); //image changes ad menu_item
        formData.append("name", data.name);

        const result = await axios.post(
            'http://localhost:4000/api/food/menulist',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if(result.data.success){
            console.log("item added success fully",result.data);
            
         setData({name:""});
         setMenuImage(null);
        toast.success(result.data?.message || "Menu added successfully");

        }



    } catch (err) {
        if (err.response) {
         console.error("Server error full:", JSON.stringify(err.response?.data, null, 2));

            toast.error(err.response.data?.message || "Server error occurred");
        } else {
            console.error("Failed to add menu:", err.message);
            toast.error(err.message);
        }
    }
};

    return (
       
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
  <input
    type="text"
    name="name"
    value={data.name || ""}
    placeholder="Menu name"
    onChange={(e) => setData({...data,name:e.target.value})}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     required
  />
  <div>
  <label htmlFor="image">
             <img
               src={file ? URL.createObjectURL(file) : assets.upload_area}
               alt="Upload"
             />
   </label>
  <input
  id='image'
    type="file"
    accept="image/*"
    onChange={(e) => setMenuImage(e.target.files[0])}
    className="w-full text-gray-600 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
  />
  </div>

  <button
    type="submit"
    className="w-full bg-black/100 hover:bg-black/50 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
  >
    ADD
  </button>
</form>

    );
}

export default AddMenu;
