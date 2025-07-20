import React from 'react';
import { Table } from '@tanstack/react-table';

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
  return (
    <div className='table-pagination'>
      <div className='pagination-buttons'>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className='pagination-button'>
          {'<<'}
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className='pagination-button'>
          {'<'}
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className='pagination-button'>
          {'>'}
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className='pagination-button'>
          {'>>'}
        </button>
      </div>

      <div className='pagination-info'>
        <span className='pagination-text'>
          עמוד{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} מתוך {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className='pagination-select'
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              הצג {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
