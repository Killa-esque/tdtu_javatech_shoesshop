import { https } from "./configURL";


export const productService = {
  getProductList: () => {
    return https.get(`api/client/products`);
  },
  getBrandList: () => {
    return https.get(`api/brands`);
  },
  getCategoryList: () => {
    return https.get(`/api/categories`);
  },
  getProductById: (id) => {
    return https.get(`/api/products/${id}`);
  },
  getProductByBrands: (id) => {
    return https.get(`/api/client/products/getByBrands?id=${id}`);
  },
  getProductByCategories: (id) => {
    return https.get(`/api/client/products/getByCategories?id=${id}`);
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
};
