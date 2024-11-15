import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import ProductPage from "./pages/Product";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
