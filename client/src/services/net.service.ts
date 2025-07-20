import { httpService } from './http.service';

export async function getProductTypes() {
  try {
    const res = await httpService.get('/api/product-types');
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getProducts() {
  try {
    const res = await httpService.get('/api/products');
    return res;
  } catch (err) {
    throw err;
  }
}

export async function saveProduct() {
  try {
    const res = await httpService.get('/api/save');
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
