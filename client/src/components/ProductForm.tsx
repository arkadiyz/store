import React, { useState, useEffect } from 'react';
import { Product, ProductFormData, ProductType } from '../types/Product';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import './ProductForm.css';
import { formatDateForInput, setDefoultDateForDisplay } from '../services/utils';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: ProductFormData) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    sku: '',
    productDescription: '',
    productTypeId: '',
    marketedAt: setDefoultDateForDisplay(),
  });
  const { productTypes } = useSelector((state: RootState) => state.app);

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  console.log('marketedAt ', product);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let tempValue: number | string;
    switch (name) {
      case 'productTypeId':
        console.log('This is an apple');
        tempValue = Number(value);

        break;
      case 'sku':
        console.log('This is an apple');
        tempValue = String(value);

        break;

      default:
        tempValue = value;
        break;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: tempValue,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'שם המוצר נדרש';
    }

    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'תיאור המוצר נדרש';
    }

    if (!formData.productTypeId) {
      newErrors.productTypeId = 'סוג המוצר נדרש';
    }

    if (!formData.marketedAt) {
      newErrors.marketedAt = 'תאריך שיווק נדרש';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className='product-form-container'>
      <form onSubmit={handleSubmit}>
        <div className='product-form-grid'>
          <div>
            <label htmlFor='productName' className='product-form-label'>
              שם המוצר *
            </label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={formData.productName}
              onChange={handleChange}
              className={`product-form-input ${errors.productName ? 'error' : ''}`}
              placeholder='הכנס שם מוצר'
              maxLength={50}
            />
            <div className='product-form-input-info'>
              <div className={`char-counter ${formData.productName.length > 49 ? 'warn' : ''}`}>{formData.productName.length} / 50 תווים</div>
              {errors.productName && <span className='product-form-error'>{errors.productName}</span>}
            </div>
          </div>

          <div>
            <label htmlFor='sku' className='product-form-label'>
              מק"ט
            </label>
            <input
              type='number'
              id='sku'
              name='sku'
              value={formData.sku}
              onChange={handleChange}
              className='product-form-input'
              placeholder='הכנס מספר מק"ט'
              min={0}
              maxLength={9}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
            />
            <div className={`char-counter ${formData.sku.length > 9 ? 'warn' : ''}`}>{formData.sku.length} / 10 תווים</div>
          </div>
        </div>

        <div className='product-form-group'>
          <label htmlFor='productDescription' className='product-form-label'>
            תיאור המוצר *
          </label>
          <textarea
            id='productDescription'
            name='productDescription'
            value={formData.productDescription}
            onChange={handleChange}
            className={`product-form-textarea ${errors.productDescription ? 'error' : ''}`}
            placeholder='הכנס תיאור מפורט של המוצר'
            rows={3}
          />
          {errors.productDescription && <span className='product-form-error'>{errors.productDescription}</span>}
        </div>

        <div className='product-form-grid'>
          <div>
            <label htmlFor='productType' className='product-form-label'>
              סוג המוצר *
            </label>
            <select
              id='productType'
              name='productTypeId'
              value={formData.productTypeId}
              onChange={handleChange}
              className={`product-form-select ${errors.productTypeId ? 'error' : ''}`}
            >
              <option value=''>בחר סוג מוצר</option>
              {Array.isArray(productTypes) &&
                productTypes.map((type: ProductType) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
            {errors.productTypeId && <span className='product-form-error'>{errors.productTypeId}</span>}
          </div>

          <div>
            <label htmlFor='marketDate' className='product-form-label'>
              תאריך שיווק *
            </label>
            <input
              type='date'
              id='marketDate'
              name='marketedAt'
              value={formatDateForInput(formData.marketedAt)}
              onChange={handleChange}
              className={`product-form-input ${errors.marketedAt ? 'error' : ''}`}
            />
            {errors.marketedAt && <span className='product-form-error'>{errors.marketedAt}</span>}
          </div>
        </div>
        <div className='product-form-actions'>
          <button type='button' onClick={onCancel} className='product-form-button cancel'>
            ביטול
          </button>
          <button type='submit' className='product-form-button primary'>
            {product ? 'עדכן מוצר' : 'הוסף מוצר'}
          </button>
        </div>
      </form>
    </div>
  );
};
