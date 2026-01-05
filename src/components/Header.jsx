import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Header() {
  return (
    <header className="header flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link to="/" className="logo font-bold text-xl">E-Store</Link>
      <nav className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="flex items-center gap-1">
          <AiOutlineShoppingCart size={20} /> Cart
        </Link>
      </nav>
    </header>
  );
}
