import React from 'react';
import { Row } from '@tanstack/react-table';
import { TableRow } from './TableRow';

interface TableBodyProps<T> {
  rows: Row<T>[];
  onRowClick?: (row: T) => void;
}

export function TableBody<T>({ rows, onRowClick }: TableBodyProps<T>) {
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow key={row.id} row={row} onRowClick={onRowClick} />
      ))}
    </tbody>
  );
}
