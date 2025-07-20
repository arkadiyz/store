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
      {/* Main Content */}
      <main style={{ padding: '40px' }}>
        <Table />
      </main>
    </div>
  );
};

export default HomePage;
