import React, { useState, useEffect } from 'react';
import { Product, ProductFormData, ProductType } from '../types/Product';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import './ProductForm.css';

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
    productType: '',
    marketDate: '',
  });
  const { productTypes } = useSelector((state: RootState) => state.app);

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.sku.trim()) {
      newErrors.sku = 'מק"ט נדרש';
    }

    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'תיאור המוצר נדרש';
    }

    if (!formData.productType.trim()) {
      newErrors.productType = 'סוג המוצר נדרש';
    }

    if (!formData.marketDate) {
      newErrors.marketDate = 'תאריך שיווק נדרש';
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
            />
            {errors.productName && <span className='product-form-error'>{errors.productName}</span>}
          </div>

          <div>
            <label htmlFor='sku' className='product-form-label'>
              מק"ט *
            </label>
            <input
              type='text'
              id='sku'
              name='sku'
              value={formData.sku}
              onChange={handleChange}
              className={`product-form-input ${errors.sku ? 'error' : ''}`}
              placeholder='הכנס מק״ט'
            />
            {errors.sku && <span className='product-form-error'>{errors.sku}</span>}
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
              name='productType'
              value={formData.productType}
              onChange={handleChange}
              className={`product-form-select ${errors.productType ? 'error' : ''}`}
            >
              <option value=''>בחר סוג מוצר</option>
              {Array.isArray(productTypes) &&
                productTypes.map((type: ProductType) => (
                  <option key={type.id} value={type.name}>
                    {type.id} - {type.name}
                  </option>
                ))}
            </select>
            {errors.productType && <span className='product-form-error'>{errors.productType}</span>}
          </div>

          <div>
            <label htmlFor='marketDate' className='product-form-label'>
              תאריך שיווק *
            </label>
            <input
              type='date'
              id='marketDate'
              name='marketDate'
              value={formData.marketDate}
              onChange={handleChange}
              className={`product-form-input ${errors.marketDate ? 'error' : ''}`}
            />
            {errors.marketDate && <span className='product-form-error'>{errors.marketDate}</span>}
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
