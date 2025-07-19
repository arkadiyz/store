export default interface PageQuery {
  pageNum: number;
  pageCount: number;
  sortBy?: string;
}

export interface Product {
  id: number;
  shortName: string;
  sku: string;
  productDescription: string;
  produntType: ProduntType;
  marketAt: string;
}

interface ProduntType {
  id: number;
  name: string;
}
