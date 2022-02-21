import Cookies from 'js-cookie';
import Layout from '../components/Layout';

export default function Cart() {
  const cartQuantity = JSON.parse(Cookies.get('Cart') || '0');
  return (
    <Layout quantity={cartQuantity}>
      <button>{cartQuantity}</button>
    </Layout>
  );
}
