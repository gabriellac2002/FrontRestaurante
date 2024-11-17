import axios from "axios";
import { API_URL } from "../utils";
import { User } from "../../Types/types";

const PRODUCTS_URL = `${API_URL}auth/`;

export const login = async (email: string) => {
  try {
    const response = await axios.post(PRODUCTS_URL, { email });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (user: User) => {
  const url = `${PRODUCTS_URL}register`;
  try {
    const response = await axios.post(url, user);

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
