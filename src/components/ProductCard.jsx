import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductCard({ product }) {
  const { openProduct } = useContext(ProductContext);

  return (
    <div className="card" onClick={() => openProduct(product)}>
      <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>

      <button className="btn ">
        Add to Cart
      </button>
    </div>
  );
}
