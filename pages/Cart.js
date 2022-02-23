import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import productsDatabase from '../util/database';

export default function Cart() {
  const cartItems = getParsedCookie('addedToCart') || [];
  const [cart, setCart] = useState(cartItems);

  const productPrice = productsDatabase.map((product) => product.price);

  // calculate total price

  // delete item from cart
  const deleteFromCart = (id) => {
    const newCookie = cart.filter((cookieObject) => {
      return cookieObject.id === id;
    });
    setCart(newCookie);
    setParsedCookie('addedToCart', newCookie);
  };

  // const cartQuantity = JSON.parse(Cookies.get('Cart') || '0');
  console.log(productPrice);
  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.main}>
        {cartItems.map((item) => {
          return (
            <div key={`product-${item.id}`} className={styles.card}>
              <Image
                src={`/product-pic/${item.id}.jpg`}
                width="200"
                height="200"
              />
              €{item.amount * productPrice[item.id - 1]}
              <div>{item.amount}</div>
              <Link href={`/products/${item.id}`}>
                <a>{item.name}</a>
              </Link>{' '}
            </div>
          );
        })}
      </div>

      <button onClick={() => deleteFromCart(cartItems.id)}>x</button>
    </Layout>
  );
}
