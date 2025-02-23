// import React, { useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);

//   const handleFileChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const sellerId = localStorage.getItem("sellerId");
//     if (!sellerId) {
//       alert("You must be logged in as a seller to add products.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("image", image);
//     formData.append("sellerId", sellerId);
  
//     // ✅ Debugging log
//     // console.log("FormData:", [...formData.entries()]);
  
//     try {
//       const response = await axios.post("http://localhost:8080/api/products/add", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Product added successfully!");

//       // if(response.data){
//       //   setProducts(response.data);
//       // }
//       // window.location.reload();

//       // updateProductList(response.data);
//     } catch (error) {
//       console.error("Error adding product:", error.response?.data || error.message);
//       alert(`Failed to add product. ${error.response?.data?.error || "Please check your input."}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
//         <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
//         <input type="file" accept="image/*" onChange={handleFileChange} required />
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sellerId = localStorage.getItem("sellerId");

    if (!sellerId) {
      alert("You must be logged in as a seller to add products.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("sellerId", sellerId);

    try {
      const response = await axios.post("http://localhost:8080/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      navigate("/seller-dashboard", { state: { newProduct: response.data } });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(`Failed to add product. ${error.response?.data?.error || "Please check your input."}`);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

