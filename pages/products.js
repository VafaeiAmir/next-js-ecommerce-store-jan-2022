import { css } from '@emotion/react';
import Link from 'next/link';
import Layout from '../components/Layout';
import productsDatabase from '../util/database';

const productStyle = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;
export default function Products(props) {
  console.log('props', JSON.stringify(props, null, 2));
  return (
    <Layout>
      <title>Products</title>
      <meta description="A list of products and their ids" />
      <h1>Products</h1>
      {props.products.map((product) => {
        return (
          <div key={`product-${product.id}`} css={productStyle}>
            <Link href={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </div>
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
