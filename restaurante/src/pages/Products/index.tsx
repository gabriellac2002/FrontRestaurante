import { Table, Button, Drawer, Modal } from "@mantine/core";
import Navbar from "../../components/Navbar/Navbar";
import { Product } from "../../../Types/types";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../../services/Products";
import { MdDelete, MdEdit } from "react-icons/md";
import FormProduct from "../../components/Products/FormProduct";
import { useDisclosure } from "@mantine/hooks";
import { IoAddSharp } from "react-icons/io5";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();

  const [opened, { open, close }] = useDisclosure(false);
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);

  const rows = products.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>
        <Button
          variant="light"
          color="orange"
          onClick={() => {
            setProduct(element);
            open();
          }}
        >
          <MdEdit />
        </Button>
      </Table.Td>
      <Table.Td>
        <Button
          variant="light"
          color="red"
          onClick={() => {
            setProduct(element);
            openModal();
          }}
        >
          <MdDelete />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        close();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Erro ao atualizar o produto");
      });
  };

  const handleCreate = (newProduct: Product) => {
    createProduct(newProduct)
      .then((product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
        closeCreate();
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        alert("Erro ao criar o produto");
      });
  };

  const handleDelete = () => {
    deleteProduct(product?.id || "")
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((element) => element.id !== product?.id)
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Erro ao deletar o produto");
      });
  };

  return (
    <div className="bg-yellow-50 min-h-screen">
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6 text-center">
          Lista de Produtos
        </h1>

        <div className="flex justify-end mb-4">
          <Button
            color="yellow"
            radius="xl"
            size="md"
            onClick={() => openCreate()}
          >
            <IoAddSharp />
          </Button>
        </div>

        {products && products.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Table stickyHeader stickyHeaderOffset={60}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nome</Table.Th>
                  <Table.Th>Categoria</Table.Th>
                  <Table.Th>Preço</Table.Th>
                  <Table.Th>Editar</Table.Th>
                  <Table.Th>Apagar</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        )}
        {products.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            Não há nenhum produto cadastrado ainda.
          </div>
        ) : null}
      </div>

      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Editar Produto"
        position="right"
      >
        <FormProduct
          product={product}
          onSave={handleSave}
          close={() => close()}
        />
      </Drawer>
      <Drawer
        offset={8}
        radius="md"
        opened={openedCreate}
        onClose={closeCreate}
        title="Criar Produto"
        position="right"
      >
        <FormProduct onSave={handleCreate} close={() => close()} />
      </Drawer>

      <Modal
        opened={openedModal}
        onClose={closeModal}
        title="Confirmar Deleção"
      >
        <div>Tem certeza que deseja deletar este produto?</div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" color="gray" onClick={closeModal}>
            Cancelar
          </Button>
          <Button color="red" onClick={handleDelete} className="ml-2">
            Deletar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
