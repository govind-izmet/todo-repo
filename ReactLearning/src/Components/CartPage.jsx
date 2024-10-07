import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
              return null; // Remove item if quantity is 0
            }
            return { ...item, quantity: newQuantity }; // Update quantity
          }
          return item; // Keep unchanged item
        })
        .filter(Boolean); // Filter out nulls
    });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    navigate("/ecart"); // Uncomment this line if you have a checkout route
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      <div className="row">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="col-md-12 mb-3">
              <div className="card cart-item shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-2">
                    <img src={item.thumbnail} className="img-fluid rounded-start" alt={item.title} />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-number">{item.quantity}</span>
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-section text-end">
          <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}

      <style jsx>{`
        .cart-item {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          margin-bottom: 20px;
          transition: box-shadow 0.3s;
        }

        .cart-item:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
          transition: background-color 0.3s ease;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        .btn-secondary {
          background-color: #6c757d;
          border: none;
          color: #fff;
          transition: background-color 0.3s ease;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
        }

        .quantity-number {
          margin: 0 10px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .total-section {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
          font-size: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .total-section h4 {
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .card-title {
            font-size: 1rem;
          }
          .quantity-number {
            font-size: 1rem;
          }
          .total-section {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
