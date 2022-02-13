import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { Product } from '../../components/Product';
import productsDatabase from '../../util/database';

const productPrice = {
  currency: 'eur',
  unitAmount: 20000,
};

export default function SingleProduct(props) {
  function handleClick() {
    console.log('buy');
  }
  return (
    <Layout>
      <Head>
        <title>
          {props.product.name} ({props.product.id})
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
      <Product clickHandler={() => handleClick} productPrice={productPrice} />
      <div>name: {props.product.name}</div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.query.productId;
  console.log('db', productsDatabase);

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
      product: matchingProduct,
      // productId: productId,
    },
  };
}
