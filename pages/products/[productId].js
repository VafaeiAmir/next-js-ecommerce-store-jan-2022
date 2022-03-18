// import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
// import { Product } from '../../components/Product';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import productsDatabase from '../../util/database';

export default function SingleProduct(props) {
  const [amount, setAmount] = useState(1);
  const cartItems = getParsedCookie('addedToCart') || [];
  const [cart, setCart] = useState(cartItems);

  // decrement amount added to cart
  function handleDecrementAmount() {
    if (amount <= 1) {
      setAmount(1);
      return;
    }
    setAmount(amount - 1);
  }

  // increment amount added to cart
  function handleIncrementAmount() {
    return setAmount(amount + 1);
  }

  function clickAddToCart(id) {
    // is id in array => return true or false
    const idExistInArray = cart.some((cookieObject) => cookieObject.id === id);

    // find in array => return single object with same id
    const productWithSameId = cart.find(
      (cookieObject) => cookieObject.id === id,
    );

    // filter array => return an array without product with same id
    const productsWithDifferentId = cart.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    let newCookie;
    // if cookie id exists, update amount
    if (idExistInArray) {
      newCookie = [
        ...productsWithDifferentId,
        {
          id: productWithSameId.id,
          amount: productWithSameId.amount + amount,
          name: productWithSameId.name,
        },
      ];

      // add new cookie
    } else {
      newCookie = [
        ...cartItems,
        {
          id: id,
          amount: amount,
          name: props.product.name,
        },
      ];
    }
    setParsedCookie('addedToCart', newCookie);
    setCart(newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>
          {props.product.name} {props.product.id}
        </title>
        <meta description={`${props.product.name} `} />
      </Head>
      <h1>{props.product.name}</h1>
      <h2>{props.product.text}</h2>
      <Image
        src={`/product-pic/${props.product.id}.jpg`}
        width="200"
        height="200"
      />
      <div className={styles.PrQuAd}>
        <p> </p>
        <div data-test-id="product-price">
          {props.product.price / 1} € Price
        </div>
        <p> </p>
        <div>
          <button onClick={() => handleDecrementAmount()}>-</button>
          <span>{amount}</span>
          <button onClick={() => handleIncrementAmount()}>+</button>
          <p> </p>
          <button
            className={styles.addButton}
            data-test-id="product-add-to-cart"
            onClick={() => clickAddToCart(props.product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.query.productId;
  // console.log('db', productsDatabase);
  const addedToCartOnCookies = context.req.cookies.addedToCart || '[]';
  // if there is no addedToCart cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const addedToCart = JSON.parse(addedToCartOnCookies);

  const matchingProduct = productsDatabase.find((product) => {
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (product.id === productId) {
      return true;
    } else {
      return false;
    }
  });

  return {
    props: {
      products: productsDatabase,
      product: matchingProduct,
      addedToCart: addedToCart,
      productId: productId,
    },
  };
}
