import { useDispatch } from 'react-redux';
import { Table } from '../components/ReactTable/Table';
import { AppDispatch, RootState } from '../redux/store';
import { getProducts } from '../services/net.service';
import './HomePage.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
