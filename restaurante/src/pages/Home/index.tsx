import { useEffect, useState } from "react";
import { Product } from "../../../Types/types";
import { getAllProducts } from "../../../services/Products";
import ProductCard from "../../components/Products/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Card, Text } from "@mantine/core";
import { SiIfood } from "react-icons/si";
import { MdFastfood } from "react-icons/md";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import Opinions from "../../components/Products/Opinions";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);

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

        <section className="container mx-auto py-10 px-3">
          <h2 className="text-3xl font-bold text-center mb-6">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
