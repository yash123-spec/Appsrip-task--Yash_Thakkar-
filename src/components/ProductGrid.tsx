'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product, FilterState } from '@/types/product';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import styles from '../styles/ProductGrid.module.css';

interface ProductGridProps {
  initialProducts: Product[];
  categories: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ initialProducts, categories }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Desktop: open by default
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    searchQuery: '',
    sortBy: 'recommended'
  });

  // Detect mobile screen size and adjust filter state
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Only set initial state once
      if (!isInitialized) {
        setIsFilterOpen(!mobile); // Open on desktop, closed on mobile
        setIsInitialized(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isInitialized]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleSearchChange = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by price range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      case 'popular':
        return [...filtered].sort((a, b) => b.rating.count - a.rating.count);
      case 'price-high-to-low':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'price-low-to-high':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'recommended':
      default:
        return [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }, [products, filters]);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>DISCOVER OUR PRODUCTS</h1>
        <p className={styles.heroDescription}>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. 
          Dolor integer scelerisque nibh amet mi ut elementum dolor.
        </p>
      </section>

      <div className={styles.content}>
        {/* Filter Sidebar */}
        {(isFilterOpen || isMobile) && (
          <FilterSidebar
            isOpen={isFilterOpen}
            onToggle={toggleFilter}
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />
        )}

        {/* Main Content */}
        <main className={styles.main}>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.leftControls}>
              <span className={styles.itemCount}>
                {filteredAndSortedProducts.length} ITEMS
              </span>
              <button 
                className={styles.filterToggle}
                onClick={toggleFilter}
                aria-label="Toggle filters"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14"/>
                  <line x1="4" y1="10" x2="4" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12" y2="3"/>
                  <line x1="20" y1="21" x2="20" y2="16"/>
                  <line x1="20" y1="12" x2="20" y2="3"/>
                  <line x1="1" y1="14" x2="7" y2="14"/>
                  <line x1="9" y1="8" x2="15" y2="8"/>
                  <line x1="17" y1="16" x2="23" y2="16"/>
                </svg>
                {isFilterOpen ? 'HIDE FILTER' : 'SHOW FILTER'}
              </button>
            </div>

            <div className={styles.rightControls}>
              {/* Search */}
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className={styles.searchInput}
                />
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>

              {/* Sort Dropdown */}
              <div className={styles.sortContainer}>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
                  className={styles.sortSelect}
                  aria-label="Sort products"
                >
                  <option value="recommended">RECOMMENDED</option>
                  <option value="newest">NEWEST FIRST</option>
                  <option value="popular">POPULAR</option>
                  <option value="price-high-to-low">PRICE: HIGH TO LOW</option>
                  <option value="price-low-to-high">PRICE: LOW TO HIGH</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={styles.productGrid}>
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductGrid;