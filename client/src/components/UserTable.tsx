import React from 'react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface Product {
  id: number;
  productName: string;
  sku: string;
  productDescription: string;
  productType: string;
  marketDate: string;
}

export function UserTable() {
  // נתוני דוגמה
  const products: Product[] = [
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
  ];

  // הגדרת העמודות
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'מזהה',
      size: 80, // TODO:להגדיל אחרי זה
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
      size: 100, // TODO: להגדיל אחרי זה
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
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'right' }}>טבלת משתמשים</h1>
      <p style={{ marginBottom: '24px', color: '#6b7280', textAlign: 'right' }}>ניהול משתמשים במערכת - ניתן לחפש, למיין ולעבור בין דפים</p>

      <DataTable
        data={products}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={5}
        // onRowClick={handleRowClick}
        className='user-table'
      />
    </div>
  );
}
