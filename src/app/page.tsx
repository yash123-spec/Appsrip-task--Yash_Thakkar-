import { Suspense } from 'react';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { fetchProducts, fetchCategories } from '@/utils/api';
import { Product } from '@/types/product';

// Loading component for suspense
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '400px',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading products...
  </div>
);

// Main page component with SSR
export default async function Home() {
  // Fetch data on server side for SSR
  const [products, categories]: [Product[], string[]] = await Promise.all([
    fetchProducts(),
    fetchCategories()
  ]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <ProductGrid 
          initialProducts={products} 
          categories={categories}
        />
      </Suspense>
      <Footer />
    </>
  );
}
