import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import './DataTable.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  // pageSize = 10,
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const { pageSize } = useSelector((state: RootState) => state.app.pageStatus);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className={`data-table ${className}`}>
      {/* Table */}
      <div className='table-container'>
        <table>
          <TableHeader headerGroups={table.getHeaderGroups()} enableSorting={enableSorting} />
          <TableBody rows={table.getRowModel().rows} onRowClick={onRowClick} />
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
