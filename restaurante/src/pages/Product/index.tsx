import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getProductById } from "../../../services/Products";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../contexts/CartContext";
import { MdFastfood } from "react-icons/md";
import { Paper } from "@mantine/core";
import { toast } from "react-toastify";

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
      <div className="bg-yellow-50 min-h-screen">
        <Navbar />
        <section className="container mx-auto py-10 px-3 h-auto sm:h-screen flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-shrink-0 w-full lg:w-1/2">
              {product.image ? (
                <img
                  src={"http://localhost:3000/uploads/" + product.image}
                  alt={product.name}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              ) : (
                <div className="rounded-full bg-gray-200 w-48 h-48 flex items-center justify-center mx-auto lg:mx-0">
                  <span className="text-gray-500 text-6xl">
                    <MdFastfood />
                  </span>
                </div>
              )}
            </div>

            <Paper className="w-full lg:w-1/2 text-gray-800 p-6 sm:p-10 rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-4xl font-bold">
                  {product.name}
                </h1>
                <p className="text-xl sm:text-3xl font-bold text-yellow-600">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              <button
                className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-red-700"
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} foi adicionado ao carrinho!`);
                }}
              >
                Comprar
              </button>
            </Paper>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
