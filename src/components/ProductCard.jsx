// src/components/ProductCard.jsx
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductCard({ product }) {
  const { openProduct } = useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);

  // Check if product is already in cart
  const inCart = cart.find((p) => p.id === product.id);

  return (
    <div className="card" onClick={() => openProduct(product)}>
      <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
      <h3 className="text-blue-900">{product.title}</h3>
       <p className="mt-3">₹{product.price}</p>
       <h6 className="text-sm">{product.rating} ⭐️⭐️</h6>
      

      {/* <button
        className={`btn flex items-center justify-center gap-2 ${
          inCart ? "bg-green-500 hover:bg-green-600 cursor-not-allowed" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation(); // prevent modal open
          if (!inCart) addToCart(product);
        }}
        disabled={!!inCart} // disable if in cart
      >
        <AiOutlineShoppingCart /> {inCart ? "View cart" : "Add to Cart"}
      </button> */}
    </div>
  );
}
