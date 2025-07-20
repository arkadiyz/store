import React from 'react';
import { Table } from '@tanstack/react-table';

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
  return (
    <div
      className='table-pagination'
      style={{
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: '4px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: table.getCanPreviousPage() ? 'white' : '#f3f4f6',
            cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
            opacity: table.getCanPreviousPage() ? 1 : 0.5,
          }}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: '4px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: table.getCanPreviousPage() ? 'white' : '#f3f4f6',
            cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
            opacity: table.getCanPreviousPage() ? 1 : 0.5,
          }}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            padding: '4px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: table.getCanNextPage() ? 'white' : '#f3f4f6',
            cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
            opacity: table.getCanNextPage() ? 1 : 0.5,
          }}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          style={{
            padding: '4px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: table.getCanNextPage() ? 'white' : '#f3f4f6',
            cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
            opacity: table.getCanNextPage() ? 1 : 0.5,
          }}
        >
          {'>>'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>
          עמוד{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} מתוך {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          style={{
            padding: '4px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
          }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              הצג {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
