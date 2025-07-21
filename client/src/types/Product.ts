export interface Product {
  id: number;
  productName: string;
  sku: string;
  productDescription: string;
  productTypeId: string;
  marketedAt: string;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface ProductFormData {
  productName: string;
  sku: string;
  productDescription: string;
  productTypeId: string;
  marketedAt: string;
}

export interface AppState {
  productTypes: Array<ProductType>;
  pageStatus: PageStatus;
}
export interface ErrorState {
  errMessage: string | null;
}
export interface LoaderState {
  isLoading: boolean;
}

export type PageStatus = {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalProducts: number;
};

export type ProductsResponse = {
  pageSize: number;
  pageNum: number;
  products: Array<Product>;
  totalPages: number;
  totalProducts: number;
};
