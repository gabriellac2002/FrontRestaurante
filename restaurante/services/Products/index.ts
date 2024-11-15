import axios from 'axios';
import { API_URL } from '../utils';

const PRODUCTS_URL = `${API_URL}products`;

export const getAllProducts = async () => {
    try {
        const response = await axios.get(PRODUCTS_URL);
        console.log('Products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};