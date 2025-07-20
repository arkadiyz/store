import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch } from 'react-redux';
import { setLoading } from './redux/slices/loaderSlice';
import { useSelector } from 'react-redux';

function App() {
  const { productType } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getAllProductTypes();
  }, []);

  const getAllProductTypes = async () => {
    try {
      dispatch(setLoading(true));
      // const productType: ProductType[] = await getProductTypes();
      // dispatch(setProductTypes(productType));
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
