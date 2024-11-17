import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getProductById } from "../../../services/Products";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../contexts/CartContext";
import { MdFastfood } from "react-icons/md";

export default function ProductPage() {
  const productId = window.location.pathname.split("/").pop();
  const [product, setProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((product) => setProduct(product));
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-50">
        <p className="text-xl font-bold text-yellow-600">Loading</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-yellow-50">
        <Navbar />
        <section className="container mx-auto py-10 px-3 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-shrink-0 w-full lg:w-1/2">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                <div className="rounded-full bg-gray-200 w-48 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-6xl">
                    <MdFastfood />
                  </span>
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 text-gray-800">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>
              <p className="text-3xl font-bold text-yellow-600 mb-6">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} foi adicionado ao carrinho!`);
                  window.location.href = "/cart";
                }}
              >
                Comprar
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
