// import React, { useState, useEffect } from "react";
// import Header from "../layout/Header";
// import Footer from "../layout/Footer";
// import { Carousel, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
// import axios from "axios";
// import "./Home.css";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   // ✅ Fetch products from backend on component mount
//   useEffect(() => {
//     axios.get("http://localhost:8080/api/products")
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const toggleWishlist = (productId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.includes(productId)
//         ? prevWishlist.filter((id) => id !== productId)
//         : [...prevWishlist, productId]
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="container mt-5">
//         {/* Section 1: Slider */}
//         <Carousel>
//           {products.slice(0, 3).map((product, index) => (
//             <Carousel.Item key={index}>
//               <img className="d-block w-100" src={product.imageUrl} alt={product.name} />
//               <Carousel.Caption>
//                 <h3>{product.name}</h3>
//                 <p>{product.category}</p>
//                 <Link to="/blogs">
//                   <Button variant="primary">Go to Blogs</Button>
//                 </Link>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>

//         {/* Section 2: Product Cards */}
//         <div className="row mt-5">
//           {products.map((product) => {
//             const isWishlisted = wishlist.includes(product.pid);
//             return (
//               <div className="col-md-3 mb-4" key={product.pid}>
//                 <Card>
//                   <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
//                   <Card.Body>
//                     <Card.Title>{product.name}</Card.Title>
//                     <Card.Text>Price: ₹{product.price}</Card.Text>
//                     <p>Category: {product.category}</p>
//                     <div className="wishlist" onClick={() => toggleWishlist(product.pid)}>
//                       {isWishlisted ? (
//                         <FaHeart size={22} className="wishlist-icon" color="#dc3545" />
//                       ) : (
//                         <FaRegHeart size={22} className="wishlist-icon" />
//                       )}
//                     </div>
//                     <Link to={`/product/${product.pid}`}>
//                       <Button variant="primary">Add to Cart</Button>
//                     </Link>
//                   </Card.Body>
//                 </Card>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;


// Home.js (No change in UI, just logic update)
import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import "./Home.css"; // Import styles

const Home = () => {
  // ✅ Banner Images (Separate from Products)
  const bannerImages = [
    { id: 1, imageUrl: "/images/banner1.jpg", caption: "Handmade Candles - Light up your life" },
    { id: 2, imageUrl: "/images/banner2.jpg", caption: "Exclusive Traditional Paintings" },
    { id: 3, imageUrl: "/images/banner3.jpg", caption: "Stylish Handmade Bags - Carry Tradition" }
  ];

  // ✅ Hardcoded Products
  const hardcodedProducts = [
    { pid: 1, name: "Candles", price: 999, category: "Candles", imageUrl: "/images/product1.jpg" },
    { pid: 2, name: "Beautiful Candles", price: 1999, category: "Candles", imageUrl: "/images/product2.jpg" },
    { pid: 3, name: "Traditional Art", price: 2999, category: "Paintings", imageUrl: "/images/product3.jpg" },
    { pid: 4, name: "Candle", price: 1499, category: "Candles", imageUrl: "/images/product4.jpg" },
    { pid: 5, name: "Candles", price: 899, category: "Candles", imageUrl: "/images/product5.jpg" },
    { pid: 6, name: "Handmade Bags", price: 2599, category: "Bags", imageUrl: "/images/product6.jpg" },
    { pid: 7, name: "Evil Eye Bags", price: 799, category: "Bags", imageUrl: "/images/product7.jpg" },
    { pid: 8, name: "Flower printed Bag", price: 3299, category: "Bags", imageUrl: "/images/product8.jpg" },
    { pid: 9, name: "Feather Bag", price: 599, category: "Bags", imageUrl: "/images/product9.jpg" },
    { pid: 10, name: "Bag", price: 699, category: "Bags", imageUrl: "/images/product10.jpg" },
    { pid: 11, name: "Traditional Painting", price: 1599, category: "Painting", imageUrl: "/images/product11.jpg" },
    { pid: 12, name: "Traditional Painting", price: 2899, category: "Painting", imageUrl: "/images/product12.jpg" },
    { pid: 13, name: "Traditional Painting", price: 1899, category: "Painting", imageUrl: "/images/product13.jpg" },
    { pid: 14, name: "Traditional Painting", price: 1299, category: "Painting", imageUrl: "/images/product14.jpg" },
    { pid: 15, name: "Traditional Painting", price: 1599, category: "Painting", imageUrl: "/images/product15.jpg" },
    { pid: 16, name: "Traditional Painting", price: 1099, category: "Painting", imageUrl: "/images/product16.jpg" },
    { pid: 17, name: "Traditional Painting", price: 2799, category: "Painting", imageUrl: "/images/product17.jpg" },
    { pid: 18, name: "Candle", price: 1199, category: "Candles", imageUrl: "/images/product18.jpg" },
    { pid: 19, name: "Candle", price: 2399, category: "Candles", imageUrl: "/images/product19.jpg" },
    { pid: 20, name: "Candle", price: 899, category: "Candles", imageUrl: "/images/product20.jpg" }
  ];

  // ✅ State for Products and Wishlist
  const [products, setProducts] = useState(hardcodedProducts);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Fetch Products from Backend (If Available)
  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then(response => {
        console.log("Fetched products:", response.data);
        if (Array.isArray(response.data)) {
          setProducts([...hardcodedProducts, ...response.data]);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // ✅ Wishlist Toggle
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        {/* ✅ Updated Banner Section */}
        <Carousel className="home-banner">
          {bannerImages.map((banner) => (
            <Carousel.Item key={banner.id}>
              <img className="d-block w-100 banner-image" src={banner.imageUrl} alt="Banner" />
              <Carousel.Caption className="banner-caption">
                <h3>{banner.caption}</h3>
                <Link to="/blogs">
                  <Button variant="light">Explore More</Button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* ✅ Product Cards */}
        <h2 className="text-center mt-5">All Products</h2>
        <div className="product-grid">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.pid);
            return (
              <div className="product-card" key={product.pid}>
                <Card>
                  <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="product-image" />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ₹{product.price}</Card.Text>
                    <p>Category: {product.category}</p>
                    <div className="wishlist" onClick={() => toggleWishlist(product.pid)}>
                      {isWishlisted ? (
                        <FaHeart size={22} className="wishlist-icon" color="#dc3545" />
                      ) : (
                        <FaRegHeart size={22} className="wishlist-icon" />
                      )}
                    </div>
                    <Link to={`/product/${product.pid}`}>
                      <Button variant="primary">Add to Cart</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

