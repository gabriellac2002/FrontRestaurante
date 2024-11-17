import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getProductById } from "../../../services/Products";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function ProductPage() {
  const productId = window.location.pathname.split("/").pop();
  console.log(productId);
  const [product, setProduct] = useState<Product | null>(null);

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
        <section className="container mx-auto py-10 px-3">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-shrink-0 w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full lg:w-1/2 text-gray-800">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>
              <p className="text-3xl font-bold text-yellow-600 mb-6">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium">
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
