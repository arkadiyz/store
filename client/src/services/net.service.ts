import { ProductType } from '../types/Product';
import { httpService } from './http.service';

export async function getProductTypes() {
  try {
    const res = await httpService.get('/api/product/product-types');
    if (!res || !Array.isArray(res)) {
      throw new Error('Invalid response from server');
    }
    return res as ProductType[];
  } catch (err) {
    throw err;
  }
}

export async function getProducts() {
  try {
    const res = await httpService.get('/api/product/products');
    return res;
  } catch (err) {
    throw err;
  }
}

export async function saveProduct() {
  try {
    const res = await httpService.get('/api/product/save');
    return res;
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(productId: number) {
  try {
    const res = await httpService.delete(`/api/products/${productId}`);
    return res;
  } catch (err) {
    throw err;
  }
}
