import React, { useEffect, useState } from "react";
import { getOrders } from "../../../services/Order/index";
import { Badge, Flex, Title } from "@mantine/core";
import { Order } from "../../../Types/types";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const OrderForAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <>
      <Navbar />
      <div className="mt-5 min-h-screen px-3">
        <Title order={2} className="mb-5 text-yellow-600 text-center">
          Todos os pedidos
        </Title>

        <div className="p-4 flex justify-center">
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-lg hover:shadow-xl rounded-lg p-6 w-full transition-all duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                    {order.userName}
                  </h3>

                  <p className="text-gray-700 mt-1">
                    {order.products.map((item) => (
                      <span key={item.name} className="block">
                        {item.name} ({item.quantity})
                      </span>
                    ))}
                  </p>

                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Endereço:</span>{" "}
                    {order.userAdress}
                  </p>

                  <Flex
                    justify="space-around"
                    className="mt-2 w-full items-center"
                  >
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </p>

                    <Badge
                      color={
                        order.status === "completed"
                          ? "green"
                          : order.status === "pending"
                          ? "yellow"
                          : "red"
                      }
                      variant="filled"
                      className="mt-2"
                    >
                      {order.status}
                    </Badge>
                  </Flex>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-yellow-600 font-medium">
              Não há pedidos ainda.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderForAdmin;
