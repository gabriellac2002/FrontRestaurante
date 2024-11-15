import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../Types/types";
import { getProductById } from "../../../services/Products";
import Navbar from "../../components/Navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import FormProduct from "../../components/Products/FormProduct";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (id) {
      getProductById(id).then((product) => setProduct(product));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={open}>Edit</button>

      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Authentication"
        position="right"
      >
        <FormProduct product={product} onSave={close} />
      </Drawer>
    </div>
  );
}
