import React from 'react';
import { flexRender, Header } from '@tanstack/react-table';

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
  enableSorting: boolean;
}

export function TableHeaderCell<T>({ header, enableSorting }: TableHeaderCellProps<T>) {
  return (
    <th className='table-header-cell' style={{ width: header.getSize() }}>
      {header.isPlaceholder ? null : (
        <div className='table-header-content' onClick={header.column.getToggleSortingHandler()}>
          {flexRender(header.column.columnDef.header, header.getContext())}
          {enableSorting && header.column.getCanSort() && (
            <span className='table-sort-icon'>
              {{
                asc: '↑',
                desc: '↓',
              }[header.column.getIsSorted() as string] ?? '↑↓'}
            </span>
          )}
        </div>
      )}
    </th>
  );
}
