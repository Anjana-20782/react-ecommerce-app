import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  );
}
