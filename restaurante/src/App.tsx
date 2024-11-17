import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import ProductPage from "./pages/Product";
import Products from "./pages/Products";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MantineProvider>
    </CartProvider>
  );
}

export default App;
