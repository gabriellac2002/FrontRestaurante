import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getAllProducts } from "../../../services/Products";
import ProductCard from "../../components/Products/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Badge, Card, Pagination, Text } from "@mantine/core";
import { SiIfood } from "react-icons/si";
import { MdFastfood } from "react-icons/md";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import Opinions from "../../components/Products/Opinions";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const PAGE_SIZE = 9;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useCart();
  const isAdmin = user?.isAdmin;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  const opinionsData = [
    {
      opinion: "A melhor comida da cidade! Recomendo a todos.",
      user: "Maria Silva",
    },
    {
      opinion: "Sempre fresco e delicioso. Atendimento de primeira classe.",
      user: "João Pereira",
    },
    { opinion: "Comida excelente e entrega rápida.", user: "Carlos Eduardo" },
  ];

  return (
    <div className="bg-yellow-50">
      <Navbar />
      <div>
        <section className="bg-yellow-400 text-white py-10">
          <div className="container mx-auto flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">
              Junte-se a nós e venda seus produtos ou faça um pedido agora
              mesmo!
            </h1>
            <button className="mt-6 bg-red-600 px-6 py-3 rounded-lg text-white font-medium">
              Peça Agora
            </button>
          </div>
        </section>

        <section className="py-10 w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-6">Menu</h2>
          <div className="flex flex-wrap justify-center mb-6">
            {categories.map((category) => (
              <Badge
                key={category}
                color={selectedCategory === category ? "red" : "yellow"}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer mx-2 my-1"
              >
                {category}
              </Badge>
            ))}
            {selectedCategory && (
              <Badge
                color="red"
                onClick={() => handleCategoryClick("")}
                className="cursor-pointer mx-2 my-1"
              >
                Limpar Filtro
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {products.length === 0 && (
              <div className="text-center col-span-full flex flex-col">
                <p className="text-lg">Nenhum produto disponível no momento.</p>
                {isAdmin && (
                  <Link
                    to="/products"
                    className="mt-4 bg-red-600 px-6 py-3 rounded-lg text-white font-medium"
                  >
                    Cadastrar Produtos
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Pagination
              total={Math.ceil(products.length / PAGE_SIZE)}
              value={currentPage}
              onChange={handlePageChange}
              className="mt-6"
            />
          </div>
        </section>

        <section className="bg-yellow-100 py-10 px-3">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Por que eles amam nossa comida?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="w-full"
              >
                <Card.Section>
                  <div className="flex justify-center items-center p-4 bg-red-100">
                    <BiSolidHappyHeartEyes size={48} className="text-red-600" />
                  </div>
                </Card.Section>
                <Text fw={500} size="lg" mt="md">
                  Cliente Feliz
                </Text>
                <Text mt="xs" size="sm">
                  Trabalhamos para proporcionar a melhor experiência possível.
                </Text>
              </Card>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="w-full"
              >
                <Card.Section>
                  <div className="flex justify-center items-center p-4 bg-red-100">
                    <SiIfood size={48} className="text-red-600" />
                  </div>
                </Card.Section>
                <Text fw={500} size="lg" mt="md">
                  Entregas Rápidas pelo iFood
                </Text>
                <Text mt="xs" size="sm">
                  Receba sua comida quente e fresquinha em minutos.
                </Text>
              </Card>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="w-full"
              >
                <Card.Section>
                  <div className="flex justify-center items-center p-4 bg-red-100">
                    <MdFastfood size={48} className="text-red-600" />
                  </div>
                </Card.Section>
                <Text fw={500} size="lg" mt="md">
                  Proporcionam um sabor inesquecível.
                </Text>
                <Text mt="xs" size="sm">
                  Nossa comida é preparada com os melhores ingredientes para
                  garantir a máxima qualidade e sabor.
                </Text>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 text-white py-10 px-3">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Depoimentos</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {opinionsData.map((opinion, index) => (
                <Opinions
                  key={index}
                  opinion={opinion.opinion}
                  user={opinion.user}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
