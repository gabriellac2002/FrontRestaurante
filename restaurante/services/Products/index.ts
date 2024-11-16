import axios from "axios";
import { API_URL } from "../utils";
import { Product } from "../../Types/types";

const PRODUCTS_URL = `${API_URL}products`;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const updateProduct = async (product: Product) => {
    console.log(product);
    try {
        const response = await axios.put(`${PRODUCTS_URL}/${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with id ${product.id}:`, error);
        if (error instanceof Error) {
            alert(`Error updating product: ${error.message}`);
        } else {
            alert('Error updating product');
        }
        throw error;
    }
}
