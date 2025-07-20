import React from 'react';
import { flexRender, Cell } from '@tanstack/react-table';

interface TableCellProps<T> {
  cell: Cell<T, unknown>;
}

export function TableCell<T>({ cell }: TableCellProps<T>) {
  return (
    <td
      style={{
        border: '1px solid #444',
        padding: '12px',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#1a1a1a',
        fontSize: '14px',
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
