// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0)
    return (
      <div className="container">
        <h1 className="page-title">Your Cart is Empty</h1>
        <div className="text-center py-8">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Your cart is empty. Start shopping to add items to your cart!
          </p>
        </div>
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="page-title">Your Cart ({cart.length} items)</h1>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--flipkart-blue)'
                }}>
                  ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#c82333'}
              onMouseOut={(e) => e.target.style.background = '#dc3545'}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          Order Summary
        </h2>
        <div style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: 'var(--flipkart-blue)',
          marginBottom: '1.5rem'
        }}>
          Total: ₹{total.toFixed(2)}
        </div>
        <button
          style={{
            background: 'linear-gradient(135deg, var(--flipkart-orange) 0%, #ff8c42 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 159, 67, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 159, 67, 0.3)';
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
