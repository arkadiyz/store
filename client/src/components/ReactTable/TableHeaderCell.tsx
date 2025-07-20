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
        border: '1px solid #444',
        padding: '16px 12px',
        textAlign: 'center',
        width: header.getSize(),
        backgroundColor: '#2d2d2d',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      {header.isPlaceholder ? null : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: header.column.getCanSort() ? 'pointer' : 'default',
            userSelect: header.column.getCanSort() ? 'none' : 'auto',
          }}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {enableSorting && header.column.getCanSort() && (
            <span style={{ color: '#3b82f6' }}>
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
