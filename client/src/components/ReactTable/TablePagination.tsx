import React from 'react';
import { Table } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { PageStatus } from '../../types/Product';
import { setNewPage, setStartPage, setTotalRowsInPage } from '../../redux/slices/appSlice';

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
  const { pageStatus } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  console.log('TablePagination', pageStatus);

  const onPageChangePageNum = (newPageNum: number) => {
    //     pageNum: 1,
    // pageSize: 10,
    // totalPages: 0,
    // totalProducts: 0,
    dispatch(setNewPage(newPageNum));
  };

  const onPageChangePageSize = (newPageSize: number) => {
    dispatch(setTotalRowsInPage(newPageSize));
  };

  return (
    <div className='table-pagination'>
      <div className='pagination-buttons'>
        {/* <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className='pagination-button'> */}
        <button onClick={() => onPageChangePageNum(1)} disabled={pageStatus.pageNum === 1} className='pagination-button'>
          {'<<'}
        </button>
        {/* <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className='pagination-button'> */}
        <button onClick={() => onPageChangePageNum(pageStatus.pageNum - 1)} disabled={pageStatus.pageNum === 1} className='pagination-button'>
          {'<'}
        </button>
        <button
          onClick={() => onPageChangePageNum(pageStatus.pageNum + 1)}
          disabled={pageStatus.pageNum === pageStatus.totalPages}
          className='pagination-button'
        >
          {'>'}
        </button>
        <button
          onClick={() => onPageChangePageNum(pageStatus.totalPages)}
          disabled={pageStatus.pageNum === pageStatus.totalPages}
          className='pagination-button'
        >
          {'>>'}
        </button>
      </div>

      <div className='pagination-info'>
        <span className='pagination-text'>
          עמוד{' '}
          <strong>
            {/* {table.getState().pagination.pageIndex + 1} מתוך {table.getPageCount()} */}
            {pageStatus.pageNum} מתוך {pageStatus.totalPages}
            <p className='pagination-text'>סה"כ {pageStatus.totalProducts} מוצרים</p>
          </strong>
        </span>
        <select
          // value={table.getState().pagination.pageSize}
          value={pageStatus.pageSize}
          // onChange={(e) => table.setPageSize(Number(e.target.value))}
          onChange={(e) => onPageChangePageSize(Number(e.target.value))}
          className='pagination-select'
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              הצג {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
