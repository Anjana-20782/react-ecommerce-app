import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineShoppingCart, AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function ProductDetails() {
  const { selectedProduct, closeProduct } = useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  // Check if product is already in cart
  const inCart = cart.find((p) => p.id === selectedProduct.id);

  // Calculate discount
  const discountPercent = Math.floor(Math.random() * 11) + 15;
  const originalPrice = Math.round(selectedProduct.price / (1 - discountPercent / 100));

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<AiOutlineStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<AiOutlineStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  // Product images (fallback to thumbnail if no images array)
  const productImages = selectedProduct.images || [selectedProduct.thumbnail];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'white',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={closeProduct}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to Products
          </button>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}>
              <AiOutlineHeart size={20} />
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}>
              <AiOutlineShareAlt size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}
      className="product-details-grid"
      >

        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f0f0f0';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={productImages[selectedImage]}
              alt={selectedProduct.title}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: '8px',
                transition: 'transform 0.4s ease',
                transformOrigin: 'center center'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'rotate(5deg) scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'rotate(0deg) scale(1)';
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/f8f9fa/6c757d?text=No+Image';
              }}
            />
          </div>

          {/* Thumbnail Images */}
          {productImages.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem'
            }}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    border: selectedImage === index ? '2px solid #1e3c72' : '2px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '0.25rem',
                    background: selectedImage === index ? '#e8f4fd' : 'white',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={image}
                    alt={`${selectedProduct.title} ${index + 1}`}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60/f8f9fa/6c757d?text=No+Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Title and Brand */}
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: '0 0 0.5rem 0',
              lineHeight: '1.2'
            }}>
              {selectedProduct.title}
            </h1>
            <p style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              margin: '0'
            }}>
              Brand: {selectedProduct.brand || 'Generic'}
            </p>
          </div>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {renderStars(selectedProduct.rating)}
            </div>
            <span style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {selectedProduct.rating}
            </span>
            <span style={{
              color: '#6c757d',
              fontSize: '0.9rem'
            }}>
              ({Math.floor(Math.random() * 500) + 100} reviews)
            </span>
          </div>

          {/* Price Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1e3c72'
              }}>
                ₹{selectedProduct.price.toLocaleString()}
              </span>
              <span style={{
                fontSize: '1.2rem',
                color: '#6c757d',
                textDecoration: 'line-through'
              }}>
                ₹{originalPrice.toLocaleString()}
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #00c853, #4caf50)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {discountPercent}% OFF
              </span>
            </div>

            <p style={{
              color: '#28a745',
              fontSize: '0.9rem',
              fontWeight: '600',
              margin: '0'
            }}>
              You save: ₹{(originalPrice - selectedProduct.price).toLocaleString()}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  background: '#f8f9fa',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer'
                }}
              >
                <AiOutlineMinus size={16} />
              </button>
              <span style={{
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: '#f8f9fa',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer'
                }}
              >
                <AiOutlinePlus size={16} />
              </button>
            </div>

            <button
              style={{
                background: 'linear-gradient(135deg, #ff9f43 0%, #ff8c42 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(255, 159, 67, 0.4)',
                transition: 'all 0.3s ease',
                flex: 1,
                minWidth: '150px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 159, 67, 0.4)';
              }}
              onClick={() => {
                if (inCart) {
                  navigate("/cart");
                  closeProduct();
                } else {
                  addToCart(selectedProduct);
                }
              }}
            >
              <AiOutlineShoppingCart size={18} />
              {inCart ? "View Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Delivery Info */}
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1a1a1a',
              margin: '0 0 1rem 0'
            }}>
              Delivery & Services
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🚚</span>
                <div>
                  <p style={{ margin: '0', fontWeight: '500' }}>Free Delivery</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#6c757d' }}>
                    Get it by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🔄</span>
                <div>
                  <p style={{ margin: '0', fontWeight: '500' }}>10 Days Return Policy</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#6c757d' }}>
                    Easy returns & exchanges
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>✓</span>
                <div>
                  <p style={{ margin: '0', fontWeight: '500' }}>Cash on Delivery</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#6c757d' }}>
                    Pay when you receive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        borderTop: '1px solid #e9ecef'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0 0 1.5rem 0'
        }}>
          Product Description
        </h2>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #e9ecef'
        }}>
          <p style={{
            color: '#4a4a4a',
            lineHeight: '1.6',
            fontSize: '1rem',
            margin: '0'
          }}>
            {selectedProduct.description}
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        borderTop: '1px solid #e9ecef'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0 0 1.5rem 0'
        }}>
          Specifications
        </h2>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.5rem 0'
              }}>
                General
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6c757d' }}>Brand</span>
                  <span style={{ fontWeight: '500' }}>{selectedProduct.brand || 'Generic'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6c757d' }}>Category</span>
                  <span style={{ fontWeight: '500' }}>{selectedProduct.category || 'General'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6c757d' }}>Stock</span>
                  <span style={{ fontWeight: '500', color: '#28a745' }}>
                    {selectedProduct.stock || Math.floor(Math.random() * 50) + 10} available
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.5rem 0'
              }}>
                Dimensions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6c757d' }}>Weight</span>
                  <span style={{ fontWeight: '500' }}>{selectedProduct.weight || '0.5'} kg</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6c757d' }}>Dimensions</span>
                  <span style={{ fontWeight: '500' }}>
                    {selectedProduct.dimensions?.width || '10'} × {selectedProduct.dimensions?.height || '10'} × {selectedProduct.dimensions?.depth || '5'} cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
