import React from 'react';
import { DataTable } from './ReactTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
  department: string;
}

export function UserTable() {
  // נתוני דוגמה
  const users: User[] = [
    { id: 1, name: 'יוחנן כהן', email: 'yohanan@example.com', age: 25, status: 'active', department: 'פיתוח' },
    { id: 2, name: 'שרה לוי', email: 'sarah@example.com', age: 30, status: 'inactive', department: 'מכירות' },
    { id: 3, name: 'דוד מזרחי', email: 'david@example.com', age: 28, status: 'active', department: 'שיווק' },
    { id: 4, name: 'רחל אברהם', email: 'rachel@example.com', age: 35, status: 'active', department: 'פיתוח' },
    { id: 5, name: 'משה רוזן', email: 'moshe@example.com', age: 42, status: 'inactive', department: 'מכירות' },
    { id: 6, name: 'מרים גולד', email: 'miriam@example.com', age: 27, status: 'active', department: 'HR' },
    { id: 7, name: 'אבי נחמיאס', email: 'avi@example.com', age: 33, status: 'active', department: 'פיתוח' },
    { id: 8, name: 'נועה כהן', email: 'noa@example.com', age: 29, status: 'inactive', department: 'שיווק' },
    { id: 9, name: 'אמיר ברק', email: 'amir@example.com', age: 31, status: 'active', department: 'מכירות' },
    { id: 10, name: 'תמר גבאי', email: 'tamar@example.com', age: 26, status: 'active', department: 'HR' },
    { id: 11, name: 'רון שמעון', email: 'ron@example.com', age: 38, status: 'inactive', department: 'פיתוח' },
    { id: 12, name: 'לינה חדד', email: 'lina@example.com', age: 24, status: 'active', department: 'שיווק' },
  ];

  // הגדרת העמודות
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'מזהה',
      size: 80,
    },
    {
      accessorKey: 'name',
      header: 'שם מלא',
      size: 150,
    },
    {
      accessorKey: 'email',
      header: 'דוא"ל',
      size: 200,
    },
    {
      accessorKey: 'age',
      header: 'גיל',
      size: 80,
      cell: ({ getValue }) => <span style={{ fontWeight: 'bold' }}>{getValue() as number}</span>,
    },
    {
      accessorKey: 'department',
      header: 'מחלקה',
      size: 120,
      cell: ({ getValue }) => (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: '#e0f2fe',
            color: '#0277bd',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'סטטוס',
      size: 100,
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              backgroundColor: status === 'active' ? '#dcfce7' : '#fef2f2',
              color: status === 'active' ? '#166534' : '#dc2626',
            }}
          >
            {status === 'active' ? 'פעיל' : 'לא פעיל'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'פעולות',
      size: 150,
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`עריכת משתמש: ${row.original.name}`);
            }}
            style={{
              padding: '4px 8px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            ערוך
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`האם אתה בטוח שברצונך למחוק את ${row.original.name}?`)) {
                alert(`נמחק: ${row.original.name}`);
              }
            }}
            style={{
              padding: '4px 8px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            מחק
          </button>
        </div>
      ),
    },
  ];

  const handleRowClick = (user: User) => {
    console.log('נלחץ על שורה:', user);
    alert(`פרטי משתמש: ${user.name} - ${user.email}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'right' }}>טבלת משתמשים</h1>
      <p style={{ marginBottom: '24px', color: '#6b7280', textAlign: 'right' }}>ניהול משתמשים במערכת - ניתן לחפש, למיין ולעבור בין דפים</p>

      <DataTable
        data={users}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={5}
        onRowClick={handleRowClick}
        className='user-table'
      />
    </div>
  );
}
