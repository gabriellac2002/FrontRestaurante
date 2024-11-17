import axios from "axios";
import { API_URL } from "../utils";

const ORDER_URL = `${API_URL}order`;

export const createOrder = async (userId: string, products: { productId: string, quantity: number }[]) => {
    const body = {
        userId,
        products
    };

    try {
        const response = await axios.post(ORDER_URL, body);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await axios.get(`${ORDER_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error getting orders:", error);
        throw error;
    }
};
