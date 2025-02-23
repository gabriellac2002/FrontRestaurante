import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { ActionIcon } from "@mantine/core";
import { MdFastfood, MdHome, MdLogin } from "react-icons/md";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { Tooltip } from "@mantine/core";

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
          <img src="../../Logo.png" className="w-24" alt="Falaê Delivery" />
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
              <Tooltip label="Home" withArrow>
                <Link to="/" title="Home">
                  <ActionIcon size="lg" variant="transparent" color="white">
                    <MdHome size={24} />
                  </ActionIcon>
                </Link>
              </Tooltip>
            </li>
            {user && user.isAdmin && (
              <li>
                <Tooltip label="Produtos" withArrow>
                  <Link to="/products">
                    <ActionIcon size="lg" variant="transparent" color="white">
                      <MdFastfood size={24} />
                    </ActionIcon>
                  </Link>
                </Tooltip>
              </li>
            )}
            <li>
              <Tooltip label="Carrinho" withArrow>
                <Link to="/cart">
                  <ActionIcon size="lg" variant="transparent" color="white">
                    <FaCartShopping size={24} />
                  </ActionIcon>
                </Link>
              </Tooltip>
            </li>
            {user && user.isAdmin && (
              <li>
                <Tooltip label="Pedidos" withArrow>
                  <Link to="/pedidos">
                    <ActionIcon size="lg" variant="transparent" color="white">
                      <FaClipboardList size={24} />
                    </ActionIcon>
                  </Link>
                </Tooltip>
              </li>
            )}
            {!user && (
              <>
                <li>
                  <Tooltip label="Cadastrar" withArrow>
                    <Link to="/singUp">
                      <ActionIcon size="lg" variant="transparent" color="white">
                        <FaUserCircle size={24} />
                      </ActionIcon>
                    </Link>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip label="Login" withArrow>
                    <Link to="/login">
                      <ActionIcon size="lg" variant="transparent" color="white">
                        <MdLogin size={24} />
                      </ActionIcon>
                    </Link>
                  </Tooltip>
                </li>
              </>
            )}
            {user && (
              <li>
                <Tooltip label="Sair" withArrow>
                  <ActionIcon
                    size="lg"
                    variant="transparent"
                    color="white"
                    onClick={() => {
                      removeUser();
                      window.location.href = "/";
                    }}
                  >
                    <CiLogout size={24} />
                  </ActionIcon>
                </Tooltip>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
