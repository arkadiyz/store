export interface Product {
  id: number;
  productName: string;
  sku: string;
  productDescription: string;
  productType: string;
  marketDate: string;
}

export interface ProductFormData {
  productName: string;
  sku: string;
  productDescription: string;
  productType: string;
  marketDate: string;
}
