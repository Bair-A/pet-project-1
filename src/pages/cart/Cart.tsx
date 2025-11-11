'use client';

import styles from './Cart.module.scss';

import {
  useCartAddItem,
  useCartClear,
  useCartDecrementItem,
  useCartItems,
  useCartRemoveItem
} from '@/app/store/cart';

import { formatPrice } from '@/shared/utils';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const Cart = () => {
  const items = useCartItems();
  const clear = useCartClear();
  const increment = useCartAddItem();
  const decrement = useCartDecrementItem();
  const remove = useCartRemoveItem();

  const totalCents = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map(({ product, quantity }) => (
              <div className={styles.item} key={product.id}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className={styles.thumb}
                  />
                ) : (
                  <div className={styles.thumb} />
                )}
                <div className={styles.info}>
                  <div className={styles.name}>{product.title}</div>
                  <div className={styles.meta}>
                    Unit: {formatPrice(product.price, 'USD')}
                  </div>
                  <div className={styles.controls}>
                    <button
                      className={styles.qtyBtn}
                      aria-label='Decrease quantity'
                      onClick={() => decrement(product.id)}
                    >
                      −
                    </button>
                    <span className={styles.qty} aria-live='polite'>
                      {quantity}
                    </span>
                    <button
                      className={styles.qtyBtn}
                      aria-label='Increase quantity'
                      onClick={() => increment(product, 1)}
                    >
                      +
                    </button>
                    <button
                      className={styles.remove}
                      aria-label='Remove item'
                      onClick={() => remove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.price}>
                  {formatPrice(product.price * quantity, 'USD')}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>{formatPrice(totalCents, 'USD')}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.clearButton} onClick={clear}>Clear cart</button>
            <SignedIn>
              <button className={styles.checkout}>Checkout</button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode={'modal'}>
                <span className={styles.checkout}>Sign in to order</span>
              </SignInButton>
            </SignedOut>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
