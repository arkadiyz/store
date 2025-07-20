import React from 'react';
import { Row } from '@tanstack/react-table';
import { TableCell } from './TableCell';

interface TableRowProps<T> {
  row: Row<T>;
  onRowClick?: (row: T) => void;
}

export function TableRow<T>({ row, onRowClick }: TableRowProps<T>) {
  return (
    <tr
      style={{
        cursor: onRowClick ? 'pointer' : 'default',
        backgroundColor: '#1a1a1a',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2d2d2d';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1a1a1a';
      }}
      onClick={() => onRowClick?.(row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
}
