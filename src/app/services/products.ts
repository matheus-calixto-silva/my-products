import axios from 'axios';

import { env } from '@app/config/env';
import { IProduct } from '@app/interfaces/IProduct';

const baseUrl = env.apiUrl;
console.log(baseUrl);

const getAllProducts = async () => {
  const request = await axios.get(`${baseUrl}`);
  return request.data;
};

const addNewProduct = async (product: IProduct) => {
  const request = await axios.post(`${baseUrl}`, product);
  return request.data;
};

const updateProduct = async (product: IProduct, productId: string) => {
  const request = await axios.put(`${baseUrl}/${productId}`, product);
  return request.data;
};

const getProductById = async (productId: string) => {
  const request = await axios.get(`${baseUrl}/${productId}`);
  return request.data;
};

const removeProduct = async (productId: string) => {
  const request = await axios.delete(`${baseUrl}/${productId}`);
  return request.data;
};

export default {
  getAllProducts,
  addNewProduct,
  updateProduct,
  getProductById,
  removeProduct,
};
