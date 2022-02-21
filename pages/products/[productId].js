import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { Product } from '../../components/Product';
import productsDatabase from '../../util/database';

const productAmount = {
  currency: 'eur',
  unitAmount: 20000,
};

export default function SingleProduct(props) {
  const cookieValue = JSON.parse(Cookies.get('Cart') || '0');
  const [quantity, setQuantity] = useState(cookieValue || 0);

  function handleClick(mode, price, cartQuantity) {
    // console.log('buy');
    Cookies.set('Cart', JSON.stringify(cartQuantity));
    console.log('quantity', cartQuantity);
  }
  return (
    <Layout quantity={quantity}>
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

      <p> </p>
      <Product
        clickHandler={handleClick}
        productPrice={productAmount}
        quantity={quantity}
        setQuantity={setQuantity}
      />
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
