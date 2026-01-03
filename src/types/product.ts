export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
  sortBy: 'recommended' | 'newest' | 'popular' | 'price-high-to-low' | 'price-low-to-high';
}

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
}