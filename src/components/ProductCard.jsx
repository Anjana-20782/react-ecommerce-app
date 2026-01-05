// src/components/ProductCard.jsx
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineEye } from "react-icons/ai";

export default function ProductCard({ product }) {
  const { openProduct } = useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);

  // Check if product is already in cart
  const inCart = cart.find((p) => p.id === product.id);

  // Calculate discount (example: 15-25% off)
  const discountPercent = Math.floor(Math.random() * 11) + 15; // Random 15-25%
  const originalPrice = Math.round(product.price / (1 - discountPercent / 100));

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (hasHalfStar) {
      stars.push("⭐");
    }

    return stars.join("");
  };

  return (
    <div className="card" onClick={() => openProduct(product)}>
      {/* Quick Action Buttons */}
      <div className="card-actions">
        <button className="action-btn" onClick={(e) => { e.stopPropagation(); /* wishlist logic */ }}>
          <AiOutlineHeart size={18} />
        </button>
        <button className="action-btn" onClick={(e) => { e.stopPropagation(); /* quick view logic */ }}>
          <AiOutlineEye size={18} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={product.thumbnail || product.images?.[0]}
        alt={product.title}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/180x180/f8f9fa/6c757d?text=No+Image';
        }}
      />

      {/* Product Details */}
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>

        {/* Price Section */}
        <div className="price-section">
          <p className="current-price">₹{product.price.toLocaleString()}</p>
          <p className="original-price">₹{originalPrice.toLocaleString()}</p>
          <span className="discount-badge">{discountPercent}% off</span>
        </div>

        {/* Rating Section */}
        <div className="rating-section">
          <div className="rating-stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`btn ${inCart ? "bg-green-500 hover:bg-green-600" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent modal open
            if (!inCart) addToCart(product);
          }}
        >
          <AiOutlineShoppingCart size={18} />
          {inCart ? "View Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
