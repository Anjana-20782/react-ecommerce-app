import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/products");
        setProducts(data.products);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };
    fetchProducts();
  }, []);
    const openProduct = (product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);


  return (
    <ProductContext.Provider value={{ products ,selectedProduct , openProduct ,closeProduct}}>
      {children}
    </ProductContext.Provider>
  );
};
