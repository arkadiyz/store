import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Modal } from '../Modal';
import { ProductForm } from '../ProductForm';
import { Product, ProductFormData } from '../../types/Product';
import './Table.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { deleteProduct, getProducts, saveProduct } from '../../services/net.service';
import { SearchAutoComplete } from '../SearchAutoComplete';
import getColumns from './columns';
import { toast } from 'react-toastify';

export function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const { pageStatus } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    getProductsPage();
    console.log('Page status in Table:', pageStatus);
  }, [pageStatus.pageNum, pageStatus.pageSize]);

  const getProductsPage = async () => {
    try {
      const res = await getProducts(pageStatus);
      if (res) {
        setProducts(res);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    const userConfirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את ${product.productName}?`);
    if (userConfirmed) {
      try {
        deleteProduct(product.id);
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        toast.success('הפעולה בוצע בהצלחה');
      } catch (error) {
        toast.error('אירעה שגיאה במחיקת מוצר');
      }
    }
  };

  const handleProductSearch = (product: Product) => {
    console.log('Selected product:', product);
  };

  const handleFormSubmit = async (productData: ProductFormData) => {
    try {
      if (editingProduct) {
        const savedProduct: Product = await saveProduct(productData);
        setProducts((prev) => prev.map((p) => (p.id === savedProduct.id ? { ...savedProduct, id: savedProduct.id } : p)));
      } else {
        // הוספת מוצר חדש - שליחה לשרת
        const savedProduct = await saveProduct(productData);
        console.log('savedProduct ', savedProduct);
        setProducts((prev) => [...prev, savedProduct]);

        // רענון רשימת המוצרים מהשרת
        // await getProductsPage();
      }
      setIsModalOpen(false);
      setEditingProduct(undefined);
      toast.success('הפעולה בוצע בהצלחה');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('שגיאה בשמירת המוצר');
      toast.error('אירעה שגיאה בשמירת המוצר');
    }
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  function handleExitGame() {
    const confirmed = window.confirm('האם אתה בטוח שברצונך לצאת מהמשחק?');
    if (confirmed) {
      // כאן מבצעים את פעולת היציאה
      console.log('המשחק נסגר');
      // לדוגמה: navigate to main menu or close window
    } else {
      console.log('המשתמש בחר להישאר במשחק');
    }
  }

  return (
    <div className='table-container'>
      {/* Page Title */}
      <div className='table-title'>
        <h1>ניהול מוצרים</h1>
      </div>

      {/* Search and Add Section */}
      <div className='table-controls'>
        <div className='table-search-row'>
          {/* <div className='table-search'> */}
          <SearchAutoComplete onProductSelect={handleProductSearch} placeholder='...חפש מוצר לפי שם' />
          {/* </div> */}
          <button onClick={handleAdd} className='table-add-button'>
            הוסף מוצר חדש
          </button>
          <button className='table-add-button' onClick={handleExitGame}>
            יציאה מהמשחק
          </button>
        </div>

        {/* Table Container */}
        <div className='table-wrapper'>
          <DataTable
            data={products}
            columns={getColumns(handleEdit, handleDelete)}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={true}
            className='product-table'
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleFormCancel} title={editingProduct ? 'עריכת מוצר' : 'הוספת מוצר חדש'}>
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      </Modal>
    </div>
  );
}
