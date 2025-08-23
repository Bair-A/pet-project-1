'use client';

import styles from './index.module.scss';
import FallBackImageIcon from '@/assets/icons/FallBackImageIcon';
import { formatPrice } from '@/utils';

import { Product } from '@/shared/types';

type ProductCardProps = {
  product: Product;
};

const NewProductCard = ({ product }: ProductCardProps) => {
  const {
    title,
    price,
    discountPercentage,
    images,
    brand,
    availabilityStatus
  } = product;

  const oldPrice = Math.round(price / (1 - discountPercentage / 100));
  const formattedPrice = formatPrice(price, 'USD');
  const formattedOldPrice = formatPrice(oldPrice, 'USD');

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>-{discountPercentage}%</div>
        )}
        {images?.length ? (
          <img src={images[0]} alt={title} className={styles.image} />
        ) : (
          <div className={styles.svgPlaceholder}>
            <FallBackImageIcon />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h4 className={styles.brand}>{brand}</h4>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{formattedPrice}</span>
          <span className={styles.oldPrice}>{formattedOldPrice}</span>
        </div>
        <p
          className={`${styles.inStock} ${
            availabilityStatus === 'Low Stock' ? styles.lowStock : ''
          }`}
        >
          {availabilityStatus}
        </p>
        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to Cart</button>
          <button className={styles.buyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default NewProductCard;
