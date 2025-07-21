import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../services/net.service';
import { Product } from '../types/Product';
import './SearchAutoComplete.css';
import { formatDate, getNameById } from '../services/utils';

interface SearchAutoCompleteProps {
  onProductSelect: (product: Product) => void;
  placeholder?: string;
}

export const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = (props: SearchAutoCompleteProps) => {
  const { onProductSelect, placeholder = 'חפש מוצר...' } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // חיפוש מוצרים עם דחיית זמן (debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        handleSearch();
      } else {
        setProducts([]);
        setShowDropdown(false);
      }
    }, 300); // דחיה של 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.trim().length < 2) return;

    setIsLoading(true);
    try {
      const response = await searchProducts(searchTerm.trim());
      if (response && response.products) {
        setProducts(response.products);
        setShowDropdown(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product: Product) => {
    setSearchTerm(product.productName);
    setShowDropdown(false);
    onProductSelect(product);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || products.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < products.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleProductClick(products[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // סגירת dropdown כשלוחצים מחוץ לרכיב
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='search-autocomplete-container'>
      <div className='search-input-wrapper'>
        <input
          ref={inputRef}
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= 2 && products.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className='search-input'
        />
        {isLoading && (
          <div className='search-loading'>
            <span>...מחפש</span>
          </div>
        )}
      </div>

      {showDropdown && products.length > 0 && (
        <div ref={dropdownRef} className='search-dropdown'>
          {products.map((product: Product, index) => (
            <div
              key={product.id}
              className={`search-dropdown-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleProductClick(product)}
            >
              <div className='product-details'>
                <span className='product-name'>{formatDate(product.marketedAt)}</span>
              </div>
              <div className='product-info'>
                <span className='product-name'>{product.productName}</span>
                <span className='product-sku'>מק"ט: {product.sku}</span>
              </div>
              <div className='product-details'>
                <span className='product-type'>{getNameById(product.productTypeId)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && products.length === 0 && !isLoading && searchTerm.length >= 2 && (
        <div ref={dropdownRef} className='search-dropdown'>
          <div className='search-no-results'>לא נמצאו מוצרים עבור "{searchTerm}"</div>
        </div>
      )}
    </div>
  );
};
