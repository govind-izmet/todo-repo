import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Ecart({ cartItems, setCartItems }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null); // Hovered item state
  const navigate = useNavigate();

  // Fetching data from API
  const fetchingData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setFetchedData(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[id] = (newQuantities[id] || 0) + change;
      return newQuantities;
    });
  };

  // Add product to cart
  const addToCart = (id) => {
    const quantity = quantities[id] || 1;
    const selectedItem = fetchedData.find((item) => item.id === id);
    if (selectedItem) {
      const existingItem = cartItems.find((item) => item.id === id);
      if (existingItem) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          )
        );
      } else {
        setCartItems((prevCart) => [...prevCart, { ...selectedItem, quantity }]);
      }
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 0 }));
    }
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/cart");
  };

  // Handle hover events
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary position-relative" onClick={goToCart}>
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              <span className="visually-hidden">items in cart</span>
            </span>
          )}
        </button>
      </div>

      <h1 className="text-center mb-4">EKart</h1>
      <div className="row">
        {fetchedData.length > 0 ? (
          fetchedData.map((ele) => (
            <div
              key={ele.id}
              className="col-md-4 position-relative"
              onMouseEnter={() => handleMouseEnter(ele)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card mb-3 shadow-sm" style={{ height: "400px" }}>
                <img
                  src={ele.thumbnail}
                  className="card-img-top"
                  alt={ele.title}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-text text-truncate" style={{ maxHeight: "50px", overflow: "hidden" }}>
                    {ele.description}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${ele.price}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => handleQuantityChange(ele.id, -1)}
                        disabled={(quantities[ele.id] || 0) <= 0}
                      >
                        -
                      </button>
                      <span>{quantities[ele.id] || 0}</span>
                      <button
                        className="btn btn-secondary ms-2"
                        onClick={() => handleQuantityChange(ele.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="btn btn-success" onClick={() => addToCart(ele.id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              {hoveredItem && hoveredItem.id === ele.id && (
                <div
                  className="hover-popup"
                  onMouseEnter={() => handleMouseEnter(ele)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={hoveredItem.thumbnail}
                    alt={hoveredItem.title}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <h5>{hoveredItem.title}</h5>
                  <p>{hoveredItem.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
        }

        .card {
          border: none;
          border-radius: 15px;
          transition: transform 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .hover-popup {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 10;
          width: 200px;
          height: auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          top: 0;
          left: 105%;
        }

        .btn {
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #0056b3;
        }

        .card-title {
          font-weight: bold;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}
