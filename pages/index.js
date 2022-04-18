import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import productsDatabase from '../util/database';

export default function Home(props) {
  const [likedArray, setLikedArray] = useState(props.likedProducts);

  const initialCartQuantity = JSON.parse(Cookies.get('Cart') || '0');

  function toogleProductLike(id) {
    // 1.get the value of the cookie
    const cookieValue = JSON.parse(Cookies.get('likedProducts') || '[]');

    // 2.update the cookie

    Cookies.set('likedProducts', JSON.stringify(cookieValue));

    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter((cookieObject) => {
        return cookieObject.id !== id;
      });
      console.log(newCookie);
      // CASE = when the id is not in the array => add item
    } else {
      // CASE = when the id is in the array => delete item
      newCookie = [...cookieValue, { id: id }];
    }

    // owerwrite our cookie
    setLikedArray(newCookie || []);

    Cookies.set('likedProducts', JSON.stringify(newCookie));
  }
  return (
    <Layout quantity={initialCartQuantity}>
      <div className={styles.freepik}>
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </div>
      <div className={styles.img}>
        <img
          src="/HomeDesign.jpg"
          alt="A colorful console controller "
          width={330}
          height={140}
        />
        <img
          src="/HomeDesign2.jpg"
          alt="A room with a big gaming screen "
          width={330}
          height={140}
        />
        <img
          src="/Players.jpg"
          alt="tow persons playing a game with one of those consoles"
          width={330}
          height={140}
        />
      </div>

      <h1 className={styles.title}>THE GAME IS FAR FROM OVER</h1>

      <p className={styles.description}>🥸 VINTAGE IS COOL 😎</p>
      <meta description="A list of products and their ids" />
      <div className={styles.main}>
        {props.products.map((product) => {
          const productIsLiked = likedArray.some((likedObject) => {
            return likedObject.id === product.id;
          });

          console.log(productIsLiked);

          return (
            <div key={`product-${product.id}`} className={styles.card}>
              <Image
                src={`/product-pic/${product.id}.jpg`}
                width="200"
                height="200"
              />
              <Link href={`/products/${product.id}`}>
                <a>{product.name}</a>
              </Link>{' '}
              <button onClick={() => toogleProductLike(product.id)}>
                {productIsLiked ? '😍' : '😐'}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const likedProductsOnCookies = context.req.cookies.likedProducts || '[]';
  const addedToCartOnCookies = context.req.cookies.addedToCart || '[]';
  const addedToCart = JSON.parse(addedToCartOnCookies);

  // if there is no likedProducts cookie on the browser we store to an [] otherwise we get the cookie value and parse it
  const likedProducts = JSON.parse(likedProductsOnCookies);
  // get the coockies from the browser

  // pass the cookies to the frontend
  return {
    props: {
      products: productsDatabase,
      likedProducts: likedProducts,
      addedToCart: addedToCart,
    },
  };
}
