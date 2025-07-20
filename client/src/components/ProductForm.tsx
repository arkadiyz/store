import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../types/Product';

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

  const productTypes = ['ירק', 'פרי', 'גידולי שדה', 'דגנים', 'קטניות'];

  return (
    <form onSubmit={handleSubmit} className='product-form'>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='productName'>שם המוצר *</label>
          <input
            type='text'
            id='productName'
            name='productName'
            value={formData.productName}
            onChange={handleChange}
            className={errors.productName ? 'error' : ''}
            placeholder='הכנס שם מוצר'
          />
          {errors.productName && <span className='error-message'>{errors.productName}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='sku'>מק"ט *</label>
          <input
            type='text'
            id='sku'
            name='sku'
            value={formData.sku}
            onChange={handleChange}
            className={errors.sku ? 'error' : ''}
            placeholder='הכנס מק״ט'
          />
          {errors.sku && <span className='error-message'>{errors.sku}</span>}
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='productDescription'>תיאור המוצר *</label>
        <textarea
          id='productDescription'
          name='productDescription'
          value={formData.productDescription}
          onChange={handleChange}
          className={errors.productDescription ? 'error' : ''}
          placeholder='הכנס תיאור מפורט של המוצר'
          rows={3}
        />
        {errors.productDescription && <span className='error-message'>{errors.productDescription}</span>}
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='productType'>סוג המוצר *</label>
          <select
            id='productType'
            name='productType'
            value={formData.productType}
            onChange={handleChange}
            className={errors.productType ? 'error' : ''}
          >
            <option value=''>בחר סוג מוצר</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.productType && <span className='error-message'>{errors.productType}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='marketDate'>תאריך שיווק *</label>
          <input
            type='date'
            id='marketDate'
            name='marketDate'
            value={formData.marketDate}
            onChange={handleChange}
            className={errors.marketDate ? 'error' : ''}
          />
          {errors.marketDate && <span className='error-message'>{errors.marketDate}</span>}
        </div>
      </div>

      <div className='form-actions'>
        <button type='button' onClick={onCancel} className='btn btn-cancel'>
          ביטול
        </button>
        <button type='submit' className='btn btn-primary'>
          {product ? 'עדכן מוצר' : 'הוסף מוצר'}
        </button>
      </div>
    </form>
  );
};
