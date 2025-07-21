import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../types/Product';
import { formatDate, getNameById } from '../../services/utils';

function getColumns(handleEdit: (product: Product) => void, handleDelete: (product: Product) => void): ColumnDef<Product>[] {
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
  return columns;
}

export default getColumns;
