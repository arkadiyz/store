import { Table } from '../components/ReactTable/Table';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='home-page'>
      {/* Main Content */}
      <main className='home-main'>
        <Table />
      </main>
    </div>
  );
};

export default HomePage;
