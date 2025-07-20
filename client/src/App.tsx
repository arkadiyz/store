import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch } from 'react-redux';
import { setLoading } from './redux/slices/loaderSlice';
import { useSelector } from 'react-redux';
import { ProductType } from './types/Product';
import { getProductTypes } from './services/net.service';
import { setProductTypes } from './redux/slices/appSlice';

function App() {
  const { productTypes } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getAllProductTypes();
  }, []);

  const getAllProductTypes = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getProductTypes();
      dispatch(setProductTypes(res));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;
