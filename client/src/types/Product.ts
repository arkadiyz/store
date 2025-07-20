export interface Product {
  id: number;
  productName: string;
  sku: string;
  productDescription: string;
  productType: string;
  marketDate: string;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface ProductFormData {
  productName: string;
  sku: string;
  productDescription: string;
  productType: string;
  marketDate: string;
}

export interface AppState {
  productType: Array<ProductType>;
}
