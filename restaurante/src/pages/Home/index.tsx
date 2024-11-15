import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getAllProducts } from "../../../services/Products";
import ProductCard from "../../components/Products/Card";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);
  return (
    <div>
      <div className="flex flex-row gap-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
