import React from 'react';
import { flexRender, Cell } from '@tanstack/react-table';

interface TableCellProps<T> {
  cell: Cell<T, unknown>;
}

export function TableCell<T>({ cell }: TableCellProps<T>) {
  return <td className='table-cell'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
}
