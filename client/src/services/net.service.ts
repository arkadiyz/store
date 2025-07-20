import { ProductType } from '../types/Product';
import { httpService } from './http.service';

export async function getProductTypes() {
  try {
    const res = await httpService.get('/api/product/product-types');

    return createProductTypes(res);
  } catch (err) {
    throw err;
  }
}

function createProductTypes(products: any) {
  const newProductTypes: Array<ProductType> = new Array<ProductType>();
  try {
    products.forEach((product: ProductType) => {
      const newProductType: ProductType = {
        id: product.id,
        name: product.name,
      };
      newProductTypes.push(newProductType);
    });
    return newProductTypes;
  } catch (error) {
    console.error('Error creating product types:', error);
    throw error;
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
