// import { css } from '@emotion/react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import productsDatabase from '../util/database';

/* const productStyle = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 30px;
`; */

export default function Products(props) {
  console.log('props', JSON.stringify(props, 2));
  return (
    <Layout>
      <div className={styles.freepik}>
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </div>
      <div className={styles.img}>
        <img src="/HomeDesign.jpg" alt="HomeDesign" width={350} height={140} />
        <img
          src="/HomeDesign2.jpg"
          alt="HomeDesign2"
          width={350}
          height={140}
        />
        <img src="/Players.jpg" alt="Players" width={350} height={140} />
      </div>

      <h1 className={styles.title}>Still love it?</h1>

      <p className={styles.description}>
        You can have it by just one click! 😎
      </p>
      <meta description="A list of products and their ids" />
      {props.products.map((product) => {
        return (
          <h2 key={`product-${product.id}`} className={styles.card}>
            <Link href={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </h2>
        );
      })}
    </Layout>
  );
}

export function getServerSideProps() {
  return {
    props: { products: productsDatabase },
  };
}
