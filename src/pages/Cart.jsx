// src/pages/Cart.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete, AiOutlineShopping } from "react-icons/ai";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  if (cart.length === 0)
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        margin: '2rem',
        borderRadius: '20px',
        color: 'white',
        textAlign: 'center',
        padding: '3rem'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🛒</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(45deg, #ffffff, #e8f4fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2'
        }}>
          Your Cart is Empty
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: '0 0 2rem 0',
          opacity: '0.9'
        }}>
          Add some amazing products to your cart and start shopping!
        </p>
        <button style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}>
          <AiOutlineShopping size={20} />
          Continue Shopping
        </button>
      </div>
    );

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * (quantities[item.id] || item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
    updateQuantity?.(id, newQuantity);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      background: '#f8f9fa'
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '15px',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(30, 60, 114, 0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          margin: '0 0 0.5rem 0',
          background: 'linear-gradient(45deg, #ffffff, #e8f4fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Shopping Cart
        </h1>
        <p style={{
          fontSize: '1.1rem',
          opacity: '0.9',
          margin: '0'
        }}>
          {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      {/* Cart Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '2rem',
        alignItems: 'start'
      }}>

        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map((item) => {
            const quantity = quantities[item.id] || item.quantity;
            const itemTotal = item.price * quantity;

            return (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  display: 'flex',
                  padding: '1.5rem',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>

                  {/* Product Image */}
                  <div style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f8f9fa',
                    flexShrink: 0
                  }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/f8f9fa/6c757d?text=No+Image';
                      }}
                    />

                    {/* Discount Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'linear-gradient(135deg, #ff4757, #ff3838)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {Math.floor(Math.random() * 11) + 15}% OFF
                    </div>
                  </div>

                  {/* Product Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '2.8rem'
                    }}>
                      {item.title}
                    </h3>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#1e3c72'
                      }}>
                        ₹{item.price.toLocaleString()}
                      </span>

                      <span style={{
                        fontSize: '0.9rem',
                        color: '#6c757d',
                        textDecoration: 'line-through'
                      }}>
                        ₹{Math.round(item.price * 1.2).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => updateItemQuantity(item.id, quantity - 1)}
                        style={{
                          background: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#e9ecef'}
                        onMouseOut={(e) => e.target.style.background = '#f8f9fa'}
                      >
                        <AiOutlineMinus size={16} />
                      </button>

                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateItemQuantity(item.id, quantity + 1)}
                        style={{
                          background: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          width: '32px',
                        height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#e9ecef'}
                        onMouseOut={(e) => e.target.style.background = '#f8f9fa'}
                      >
                        <AiOutlinePlus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '1rem'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#1e3c72',
                      textAlign: 'right'
                    }}>
                      ₹{itemTotal.toLocaleString()}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'linear-gradient(135deg, #ff4757, #ff3838)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <AiOutlineDelete size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef',
          position: 'sticky',
          top: '2rem',
          height: 'fit-content'
        }}>

          {/* Free Shipping Banner */}
          {subtotal < 999 && (
            <div style={{
              background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
              border: '1px solid #ffeaa7',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: '#856404',
                fontWeight: '600'
              }}>
                Add ₹{(999 - subtotal).toLocaleString()} more for FREE shipping!
              </div>
              <div style={{
                width: `${(subtotal / 999) * 100}%`,
                height: '4px',
                background: '#ffc107',
                borderRadius: '2px',
                marginTop: '0.5rem',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          )}

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
            borderBottom: '2px solid #1e3c72',
            paddingBottom: '1rem'
          }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#6c757d' }}>Subtotal ({cart.length} items)</span>
              <span style={{ fontWeight: '600' }}>₹{subtotal.toLocaleString()}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#6c757d' }}>Shipping</span>
              <span style={{
                fontWeight: '600',
                color: shipping === 0 ? '#28a745' : '#6c757d'
              }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#6c757d' }}>Tax (GST 18%)</span>
              <span style={{ fontWeight: '600' }}>₹{tax.toFixed(0)}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e9ecef', margin: '0.5rem 0' }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#1e3c72'
            }}>
              <span>Total</span>
              <span>₹{total.toFixed(0).toLocaleString()}</span>
            </div>

            <button
              style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1.2rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '1rem',
                boxShadow: '0 4px 15px rgba(30, 60, 114, 0.4)',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(30, 60, 114, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(30, 60, 114, 0.4)';
              }}
            >
              Proceed to Checkout
            </button>

            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: '#6c757d',
                marginBottom: '0.5rem'
              }}>
                Secure Checkout with
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1.2rem'
              }}>
                🔒 💳 🏦 📱
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
