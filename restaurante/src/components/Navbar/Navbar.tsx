import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, removeUser } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-yellow-500 dark:bg-yellow-600 shadow-lg">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row items-center gap-1">
          <img
            src="../../assets/logo.png"
            className="h-14 w-14"
            alt="Falaê Delivery"
          />
          <span className="self-center text-3xl font-bold text-white">
            Falaê Delivery
          </span>
        </div>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:hover:bg-yellow-700 dark:focus:ring-yellow-500"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Abrir menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto items-center justify-center`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-yellow-100 rounded-lg bg-yellow-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="text-white hover:text-yellow-300">
                Home
              </Link>
            </li>
            {user && user.isAdmin && (
              <li>
                <Link
                  to="/products"
                  className="text-white hover:text-yellow-300"
                >
                  Produtos
                </Link>
              </li>
            )}

            <li>
              <Link to="/cart" className="text-white hover:text-yellow-300">
                Carrinho
              </Link>
            </li>
            {user && user.isAdmin && (
              <li>
                <Link
                  to="/pedidos"
                  className="text-white hover:text-yellow-300"
                >
                  Pedidos
                </Link>
              </li>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-white hover:text-yellow-300"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/singUp"
                    className="text-white hover:text-yellow-300"
                  >
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <button
                  onClick={() => {
                    removeUser();
                    window.location.href = "/";
                  }}
                  className="text-white hover:text-yellow-300"
                >
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
