import React from 'react';
import { HeaderGroup } from '@tanstack/react-table';
import { TableHeaderCell } from './TableHeaderCell';

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  enableSorting: boolean;
}

export function TableHeader<T>({ headerGroups, enableSorting }: TableHeaderProps<T>) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHeaderCell key={header.id} header={header} enableSorting={enableSorting} />
          ))}
        </tr>
      ))}
    </thead>
  );
}
