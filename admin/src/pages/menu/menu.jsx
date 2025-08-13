import { useState } from "react";
import { toast } from 'react-toastify'

function AddMenu() {
    const [name, setMenuName] = useState("");
    const [file, setMenuImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
              formData.append("menu_item", file); // match multer field
            formData.append("menu_name", name);
          
            const result = await fetch(  'https://mern-project-6v4y.onrender.com/api/food/menulist'    /* 'http://localhost:4000/api/food/menulist'  */, {
                method: "POST",
                body: formData,
            });
           if(result.ok){
            const result = await result.json();
            toast.success(result.data);
            console.log("result",result);
        } else {
            toast.error(result.data);
        }
    }catch(err) {
            console.error("Failed to add menu:", err);
        }
    }

    return (
       
       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
  <input
    type="text"
    value={name}
    placeholder="Menu name"
    onChange={(e) => setMenuName(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setMenuImage(e.target.files[0])}
    className="w-full text-gray-600 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
  />

  <button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
  >
    ADD
  </button>
</form>

    );
}

export default AddMenu;
