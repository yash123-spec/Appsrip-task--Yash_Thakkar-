'use client';

import { useState } from 'react';
import { FilterState } from '@/types/product';
import styles from '../styles/FilterSidebar.module.css';

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onToggle,
  filters,
  onFilterChange,
  categories
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    occasion: false,
    work: false,
    fabric: false,
    segment: false,
    suitable: false,
    materials: false,
    pattern: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handlePriceChange = (field: 'min' | 'max', value: number) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      searchQuery: '',
      sortBy: 'recommended'
    });
  };

  // Mock filter options for demonstration
  const mockFilters = {
    occasion: ['Casual', 'Formal', 'Party', 'Work'],
    work: ['Office', 'Remote', 'Travel', 'Meeting'],
    fabric: ['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen'],
    segment: ['Men', 'Women', 'Kids', 'Unisex'],
    suitable: ['Summer', 'Winter', 'Spring', 'Fall'],
    materials: ['Organic', 'Synthetic', 'Blend', 'Pure'],
    pattern: ['Solid', 'Striped', 'Floral', 'Geometric', 'Abstract']
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onToggle}></div>}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Filters</h2>
          <button 
            className={styles.closeButton}
            onClick={onToggle}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className={styles.filterContent}>
          <button 
            className={styles.clearButton}
            onClick={clearFilters}
          >
            Clear All Filters
          </button>

          {/* Categories */}
          <div className={styles.filterGroup}>
            <button 
              className={styles.filterHeader}
              onClick={() => toggleSection('categories')}
              aria-expanded={expandedSections.categories}
            >
              <span>CATEGORIES</span>
              <span className={`${styles.arrow} ${expandedSections.categories ? styles.arrowUp : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.categories && (
              <div className={styles.filterOptions}>
                {categories.map(category => (
                  <label key={category} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <button 
              className={styles.filterHeader}
              onClick={() => toggleSection('price')}
              aria-expanded={expandedSections.price}
            >
              <span>PRICE</span>
              <span className={`${styles.arrow} ${expandedSections.price ? styles.arrowUp : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.price && (
              <div className={styles.filterOptions}>
                <div className={styles.priceInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                    className={styles.priceInput}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max || ''}
                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                    className={styles.priceInput}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mock Filter Sections */}
          {Object.entries(mockFilters).map(([key, options]) => (
            <div key={key} className={styles.filterGroup}>
              <button 
                className={styles.filterHeader}
                onClick={() => toggleSection(key)}
                aria-expanded={expandedSections[key]}
              >
                <span>{key.toUpperCase()}</span>
                <span className={`${styles.arrow} ${expandedSections[key] ? styles.arrowUp : ''}`}>
                  ▼
                </span>
              </button>
              {expandedSections[key] && (
                <div className={styles.filterOptions}>
                  {options.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>{option}</span>
                    </label>
                  ))}
                  <button className={styles.viewAll}>View All</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;