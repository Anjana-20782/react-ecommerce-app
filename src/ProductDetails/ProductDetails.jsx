import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { selectedProduct, closeProduct } = useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!selectedProduct) return null;

  // Check if product is already in cart
  const inCart = cart.find((p) => p.id === selectedProduct.id);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={closeProduct}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[95%] max-w-4xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-2xl float-right hover:text-black"
          onClick={closeProduct}
        >
          ✖
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="rounded-xl w-full"
          />

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{selectedProduct.title}</h2>

            <p className="text-gray-600">{selectedProduct.description}</p>

            <p className="text-3xl font-bold text-green-600">
              ₹ {selectedProduct.price}
            </p>

            <p className="text-yellow-500 font-medium">
              ⭐ {selectedProduct.rating}
            </p>

            <button
              className={`mt-3 px-4 py-2 rounded-lg text-white font-medium ${
                inCart
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => {
                if (inCart) {
                  navigate("/cart"); // go to cart page
                  closeProduct();
                } else {
                  addToCart(selectedProduct); // add to cart
                }
              }}
            >
              {inCart ? "View Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
