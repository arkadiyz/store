import { PageStatus, Product, ProductFormData, ProductsResponse, ProductType } from '../types/Product';
import { httpService } from './http.service';
import { store } from '../redux/store';
import { setStartPage } from '../redux/slices/appSlice';
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

export async function getProducts(pageStatus: PageStatus) {
  try {
    const res = await httpService.post<ProductsResponse>('/api/product', pageStatus);
    if (res && res.hasOwnProperty('products')) {
      const pageStatus: PageStatus = { pageNum: res.pageNum, pageSize: res.pageSize, totalPages: res.totalPages, totalProducts: res.totalProducts };
      console.log('Page status:', pageStatus);

      store.dispatch(setStartPage(pageStatus));

      return res.products;
    } else {
      console.warn('Expected array of products, received:', res);
    }
  } catch (err) {
    throw err;
  }
}

export async function saveProduct(productData: ProductFormData) {
  try {
    const res = await httpService.post<Product>('/api/product/save', productData);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(productId: number) {
  try {
    const res = await httpService.get(`/api/product/delete/${productId}`);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function searchProducts(testSearch: string) {
  try {
    const res = await httpService.get<ProductsResponse>(`/api/product/search/${testSearch}`);
    return res;
  } catch (err) {
    throw err;
  }
}
