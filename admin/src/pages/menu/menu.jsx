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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                placeholder="menu name"
                onChange={(e) => setMenuName(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setMenuImage(e.target.files[0])}
            />
            <button type="submit">ADD</button>
        </form>
    );
}

export default AddMenu;
