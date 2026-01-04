import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products } = useContext(ProductContext);

  return (
    <div className="container">
      <h1>Featured Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
