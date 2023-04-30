import { https_client } from "../utils/config";
import { https } from "./configURL";


export const productService = {
  getProductList: () => {
    return https_client.get(`api/client/products`);
  },
  getBrandList: () => {
    return https_client.get(`/api/client/brands`);
  },
  getCategoryList: () => {
    return https_client.get(`/api/client/categories`);
  },
  getProductById: (id) => {
    return https_client.get(`/api/client/products/${id}`);
  },
  getProductByBrands: (id) => {
    return https_client.get(`/api/client/products/getByBrands?id=${id}`);
  },
  getProductByCategories: (id) => {
    return https_client.get(`/api/client/products/getByCategories?id=${id}`);
  },
  addProduct: (id) => {
    return https.post(`api/products`);
  },
  deleteProduct: (id) => {
    return https.delete(`api/products/delete/${id}`);
  },
  updateProduct: (id) => {
    return https.put(`api/products/${id}`);
  },
  checkOutOrder: (userOrder) => {
    return https.post(`/api/checkout`, userOrder);
  }
};
