import React from 'react';

interface TableFilterProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  placeholder?: string;
}

export function TableFilter({ globalFilter, setGlobalFilter, placeholder = 'חיפוש כללי...' }: TableFilterProps) {
  return (
    <div className='table-filters' style={{ marginBottom: '16px' }}>
      <input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          width: '300px',
        }}
      />
    </div>
  );
}
