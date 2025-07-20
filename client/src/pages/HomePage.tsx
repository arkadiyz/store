import { Table } from '../components/ReactTable/Table';

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header Navigation */}
      <header
        style={{
          backgroundColor: '#2d2d2d',
          padding: '16px 32px',
          borderBottom: '1px solid #444',
        }}
      >
        <nav
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            יציאה
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            הגדרות
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            בית מוצרים
          </button>
          <div style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 'bold' }}>ניהול מוצרים</div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px' }}>
        <Table />
      </main>
    </div>
  );
};

export default HomePage;
