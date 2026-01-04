import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
      <button className="btn">
        <AiOutlineShoppingCart /> Add to Cart
      </button>
    </div>
  );
}
