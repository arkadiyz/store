import React from 'react';
import { Row } from '@tanstack/react-table';
import { TableCell } from './TableCell';

interface TableRowProps<T> {
  row: Row<T>;
  onRowClick?: (row: T) => void;
}

export function TableRow<T>({ row, onRowClick }: TableRowProps<T>) {
  return (
    <tr className='table-row' style={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick?.(row.original)}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
}
