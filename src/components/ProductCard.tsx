'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import styles from '../styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={`${product.title} - Premium ${product.category} product`}
          width={300}
          height={300}
          className={styles.productImage}
          loading="lazy"
        />
        <button 
          className={`${styles.wishlistButton} ${isLiked ? styles.liked : ''}`} 
          aria-label={`${isLiked ? 'Remove' : 'Add'} ${product.title} ${isLiked ? 'from' : 'to'} wishlist`}
          onClick={toggleLike}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.title}</h3>
        <div className={styles.productMeta}>
          <p className={styles.signInText}>
            <a href="#" className={styles.signInLink}>Sign in</a> or Create an account to see pricing
          </p>
          <button 
            className={`${styles.wishlistIconSmall} ${isLiked ? styles.liked : ''}`} 
            aria-label={`${isLiked ? 'Remove' : 'Add'} ${product.title} ${isLiked ? 'from' : 'to'} wishlist`}
            onClick={toggleLike}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;