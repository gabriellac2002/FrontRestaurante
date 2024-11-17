import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import ProductPage from "./pages/Product";
import Products from "./pages/Products";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Register from "./pages/SingUp";
import Login from "./pages/SingIn";
import OrderForAdmin from "./pages/Orders/OrderForAdmin";

function App() {
  return (
    <CartProvider>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/singUp" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pedidos" element={<OrderForAdmin />} />
        </Routes>
      </MantineProvider>
    </CartProvider>
  );
}

export default App;
