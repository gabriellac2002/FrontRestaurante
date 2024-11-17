import React, { useEffect, useState } from "react";
import { getOrders } from "../../../services/Order/index";
import { Table, Title } from "@mantine/core";
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

  return (
    <>
      <Navbar />
      <div className="mt-5 min-h-screen px-3">
        <Title order={2} className="mb-5 text-yellow-600 text-center">
          Todos os pedidos
        </Title>

        <div className="p-2">
          <Table
            striped
            highlightOnHover
            withColumnBorders
            className="bg-orange-100 rounded-lg "
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="text-yellow-600">Pedido</Table.Th>
                <Table.Th className="text-yellow-600">Cliente</Table.Th>
                <Table.Th className="text-yellow-600">Produtos</Table.Th>
                <Table.Th className="text-yellow-600">Preço total</Table.Th>
                <Table.Th className="text-yellow-600">Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders.map((order) => (
                <Table.Tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>
                    {order.products
                      .map((item) => `${item.name} (${item.quantity})`)
                      .join(", ")}
                  </td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderForAdmin;
