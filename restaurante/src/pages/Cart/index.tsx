import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="bg-yellow-50 min-h-screen">
      <Navbar />
      <section className="container mx-auto py-10 px-3 min-h-screen">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Carrinho de Compras
        </h2>
        {cart.length === 0 ? (
          <div className="text-center gap-2">
            <span role="img" aria-label="sad" className="text-6xl mb-2">
              😢
            </span>
            <p className="text-lg">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-lg shadow-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-lg text-gray-600">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg"
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg"
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium self-center mt-6">
              Finalizar Pedido
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
