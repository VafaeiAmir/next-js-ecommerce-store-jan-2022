import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import productsDatabase from '../util/database';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function Cart(props) {
  const cartItems = getParsedCookie('addedToCart') || [];
  const [productsInCart, setProductsInCart] = useState(props.cart);
  const [newPrice, setNewPrice] = useState(0);
  const [cart, setCart] = useState(cartItems);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const getAmount = () => {
      const amountProduct = productsInCart.map((product) => {
        return product.amount;
      });

      const sum = amountProduct.reduce((partialSum, a) => partialSum + a, 0);

      setAmount(sum);

      const productPrice = productsInCart.map((product) => {
        return props.pokemonsInDb[product.id - 1].price * product.amount;
      });

      const sumPrice = productPrice.reduce(
        (partialSum, a) => partialSum + a,
        0,
      );

      setNewPrice(sumPrice);
    };

    getAmount();
  }, [productsInCart, props]);

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
  function handleDeleteProductInCookie(id) {
    // filter products with different id than product to delete and return them
    const newCookie = productsInCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });

    setProductsInCart(newCookie);
    Cookies.set('cart', JSON.stringify(newCookie));

    const amountProduct = newCookie.map((product) => {
      return product.amount;
    });

    const sum = amountProduct.reduce((partialSum, a) => partialSum + a, 0);
    setAmount(sum);

    const priceProduct = newCookie.map((product) => {
      return props.productsInDb[product.id - 1].price * product.amount;
    });

    const sumPrice = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

    setNewPrice(sumPrice);
  }

  // const cartQuantity = JSON.parse(Cookies.get('Cart') || '0');
  // console.log(productPrice);
  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.main}>
        {cartItems.map((item) => {
          return (
            <div
              key={`product-${item.id}`}
              className={styles.card}
              data-test-id={`cart-product-${item.id}`}
            >
              <Link href={`/products/${item.id}`}>
                <a>{item.name}</a>
              </Link>{' '}
              <Image
                src={`/product-pic/${item.id}.jpg`}
                width="200"
                height="200"
              />
              <div>
                {item.amount < 0
                  ? handleDeleteProductInCookie(item.id)
                  : props.productsInDb[item.id - 1].price * item.amount}{' '}
                €
              </div>
              {/* Price €{item.amount * productPrice[item.id - 1]} */}
              <p>Amount: {item.amount}</p>
              <button
                onClick={() => {
                  handleDeleteProductInCookie(item.id);
                }}
                data-test-id={`cart-product-remove-${item.id}`}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => deleteFromCart(cartItems.id)}
        className={styles.deleteButton}
      >
        Remove all
      </button>

      <div>
        <span>Total: </span>
        <span data-test-id="cart-total">{newPrice}</span>
        <span> € {amount} </span>
        <span>{amount > 1 ? 'Cards' : 'Card'}</span>
      </div>

      <button
        className={styles.checkOut}
        onClick={() =>
          Router.push('./checkout').catch((error) => console.log(error))
        }
        data-test-id="cart-checkout"
      >
        Checkout
      </button>
    </Layout>
  );
}

export function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);

  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend
  const productsInDb = productsDatabase;
  return {
    props: {
      cart: cart,
      productsInDb,
    },
  };
}
