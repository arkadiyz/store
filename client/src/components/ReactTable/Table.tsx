import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from '../Modal';
import { ProductForm } from '../ProductForm';
import { Product, ProductFormData } from '../../types/Product';
import './Table.css';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { deleteProduct, getProducts, saveProduct } from '../../services/net.service';
import { formatDate, getNameById } from '../../services/utils';

export function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { pageStatus } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    getProductsPage();
  }, [pageStatus]);

  const getProductsPage = async () => {
    try {
      const res = await getProducts(pageStatus);
      if (res) {
        setProducts(res);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    const userConfirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את ${product.productName}?`);
    if (userConfirmed) {
      deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleFormSubmit = async (productData: ProductFormData) => {
    try {
      if (editingProduct) {
        const savedProduct: Product = await saveProduct(productData);
        setProducts((prev) => prev.map((p) => (p.id === savedProduct.id ? { ...savedProduct, id: savedProduct.id } : p)));
      } else {
        // הוספת מוצר חדש - שליחה לשרת
        const savedProduct = await saveProduct(productData);
        console.log('savedProduct ', savedProduct);
        setProducts((prev) => [...prev, savedProduct]);

        // רענון רשימת המוצרים מהשרת
        // await getProductsPage();
      }
      setIsModalOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('שגיאה בשמירת המוצר');
    }
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'מזהה',
      size: 80,
    },

    {
      accessorKey: 'productName',
      header: 'שם המוצר',
      size: 150,
    },
    {
      accessorKey: 'sku',
      header: 'מק"ט',
      size: 50,
    },
    {
      accessorKey: 'productDescription',
      header: 'תיאור מוצר',
      size: 100,
    },
    {
      accessorKey: 'productType',
      header: 'סוג המוצר',
      size: 120,
      cell: ({ row }) => {
        const type = getNameById(row.original.productTypeId);
        return <>{type}</>;
      },
    },
    {
      accessorKey: 'marketedAt',
      header: 'תאריך שיווק המוצר',
      size: 100,
      cell: ({ row }) => {
        return <>{formatDate(row.original.marketedAt)}</>;
      },
    },
    {
      id: 'actions',
      header: 'פעולות',
      size: 120,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className='action-buttons'>
            <button onClick={() => handleEdit(product)} className='btn btn-edit'>
              עריכה
            </button>
            <button onClick={() => handleDelete(product)} className='btn btn-delete'>
              מחיקה
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='table-container'>
      {/* Page Title */}
      <div className='table-title'>
        <h1>ניהול מוצרים</h1>
      </div>

      {/* Search and Add Section */}
      <div className='table-controls'>
        <div className='table-search-row'>
          <input type='text' placeholder='חיפוש לפי שם מוצר' className='table-search-input' />
          <div className='table-cancel-label'>
            <label>ביטול</label>
          </div>
          <button onClick={handleAdd} className='table-add-button'>
            הוסף מוצר חדש
          </button>
        </div>

        {/* Table Container */}
        <div className='table-wrapper'>
          <DataTable
            data={products}
            columns={columns}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={true}
            pageSize={5}
            className='product-table'
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleFormCancel} title={editingProduct ? 'עריכת מוצר' : 'הוספת מוצר חדש'}>
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      </Modal>
    </div>
  );
}
