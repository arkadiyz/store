import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from '../Modal';
import { ProductForm } from '../ProductForm';
import { Product, ProductFormData } from '../../types/Product';

export function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      productName: 'מלפפון',
      sku: '100001',
      productDescription: 'מלפפונים טריים מהשדה, גידול אורגני.',
      productType: 'ירק',
      marketDate: '2025-07-12',
    },
    {
      id: 2,
      productName: 'תפוח עץ',
      sku: '100002',
      productDescription: 'תפוחים אדומים, מתוקים ועסיסיים.',
      productType: 'פרי',
      marketDate: '2025-07-10',
    },
    {
      id: 3,
      productName: 'עגבנייה',
      sku: '100003',
      productDescription: 'עגבניות מובחרות לבישול וסלטים.',
      productType: 'ירק',
      marketDate: '2025-07-14',
    },
    {
      id: 4,
      productName: 'תפוח אדמה',
      sku: '100004',
      productDescription: 'תפוחי אדמה מזן דזירה, אידאליים לאפייה.',
      productType: 'גידולי שדה',
      marketDate: '2025-07-15',
    },
    {
      id: 5,
      productName: 'בננה',
      sku: '100005',
      productDescription: 'בננות בשלות מהגליל העליון.',
      productType: 'פרי',
      marketDate: '2025-07-11',
    },
    {
      id: 6,
      productName: 'חסה',
      sku: '100006',
      productDescription: 'חסה ירוקה וטרייה, מתאימה לסלטים.',
      productType: 'ירק',
      marketDate: '2025-07-13',
    },
    {
      id: 7,
      productName: 'תירס',
      sku: '100007',
      productDescription: 'תירס מתוק שנקטף טרי.',
      productType: 'גידולי שדה',
      marketDate: '2025-07-09',
    },
    {
      id: 8,
      productName: 'שום',
      sku: '100008',
      productDescription: 'שום מקומי חריף וארומטי.',
      productType: 'גידולי שדה',
      marketDate: '2025-07-08',
    },
    {
      id: 9,
      productName: 'אבטיח',
      sku: '100009',
      productDescription: "אבטיח מתוק וקראנצ'י לקיץ.",
      productType: 'פרי',
      marketDate: '2025-07-10',
    },
    {
      id: 10,
      productName: 'בצל סגול',
      sku: '100010',
      productDescription: 'בצל סגול רך לבישול וסלטים.',
      productType: 'ירק',
      marketDate: '2025-07-13',
    },
    {
      id: 11,
      productName: 'גזר',
      sku: '100011',
      productDescription: 'גזר טרי ומתוק מהאדמה.',
      productType: 'ירק',
      marketDate: '2025-07-07',
    },
    {
      id: 12,
      productName: 'מנגו',
      sku: '100012',
      productDescription: 'מנגו עסיסי וטעים במיוחד.',
      productType: 'פרי',
      marketDate: '2025-07-16',
    },
  ]);

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
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleFormSubmit = (productData: ProductFormData) => {
    if (editingProduct) {
      // עריכת מוצר קיים
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)));
    } else {
      // הוספת מוצר חדש
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [...prev, { ...productData, id: newId }]);
    }
    setIsModalOpen(false);
    setEditingProduct(undefined);
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
    },
    {
      accessorKey: 'marketDate',
      header: 'תאריך שיווק המוצר',
      size: 100,
    },
    {
      id: 'actions',
      header: 'פעולות',
      size: 120,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className='action-buttons'>
            <button onClick={() => handleEdit(product)} className='btn btn-edit' title='עריכה'>
              ✏️
            </button>
            <button onClick={() => handleDelete(product)} className='btn btn-delete' title='מחיקה'>
              🗑️
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>טבלת מוצרים</h1>
        <button onClick={handleAdd} className='btn btn-add' title='הוסף מוצר חדש'>
          ➕ הוסף מוצר
        </button>
      </div>

      <p style={{ marginBottom: '24px', color: '#6b7280', textAlign: 'right' }}>ניהול מוצרים במערכת - ניתן לחפש, למיין ולעבור בין דפים</p>

      <DataTable
        data={products}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={5}
        className='user-table'
      />

      <Modal isOpen={isModalOpen} onClose={handleFormCancel} title={editingProduct ? 'עריכת מוצר' : 'הוספת מוצר חדש'}>
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      </Modal>
    </div>
  );
}
