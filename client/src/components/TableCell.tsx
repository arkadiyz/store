import React from 'react';
import { flexRender, Cell } from '@tanstack/react-table';

interface TableCellProps<T> {
  cell: Cell<T, unknown>;
}

export function TableCell<T>({ cell }: TableCellProps<T>) {
  return (
    <td
      style={{
        border: '1px solid #d1d5db',
        padding: '12px',
        textAlign: 'left',
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
