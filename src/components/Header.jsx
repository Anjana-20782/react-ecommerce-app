import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">E-Store</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <ShoppingCart size={24} />
      </nav>
    </header>
  );
}
