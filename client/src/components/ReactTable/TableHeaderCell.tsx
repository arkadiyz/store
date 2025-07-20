import React from 'react';
import { flexRender, Header } from '@tanstack/react-table';

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
  enableSorting: boolean;
}

export function TableHeaderCell<T>({ header, enableSorting }: TableHeaderCellProps<T>) {
  return (
    <th
      style={{
        border: '1px solid #d1d5db',
        padding: '12px',
        textAlign: 'left',
        width: header.getSize(),
        backgroundColor: '#f9fafb',
      }}
    >
      {header.isPlaceholder ? null : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: header.column.getCanSort() ? 'pointer' : 'default',
            userSelect: header.column.getCanSort() ? 'none' : 'auto',
          }}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {enableSorting && header.column.getCanSort() && (
            <span style={{ color: '#6b7280' }}>
              {{
                asc: ' 🔼',
                desc: ' 🔽',
              }[header.column.getIsSorted() as string] ?? ' ↕️'}
            </span>
          )}
        </div>
      )}
    </th>
  );
}
