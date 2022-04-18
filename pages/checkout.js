import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import Router from 'next/router';
import productsDatabase from '../util/database';

const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  color: white;
  margin: 1rem 1rem;
  border-radius: 8px;
`;

const checkoutText = css`
  color: black;
  text-shadow: 2px 2px 5px rgb(255, 115, 0);
`;

const formStyles = css`
  background-color: #933939;
  padding: 24px;
  flex-wrap: wrap;

  color: white;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  margin: 1rem 1rem;
  border-radius: 8px;
`;

const containerCreditCardStyles = css`
  display: flex;
  flex-direction: column;
`;
const smallInputStyles = css`
  width: 50px;
  padding: 8px 8px;
  text-align: center;
  font-size: 16px;
  border: none;
  border-radius: 4px;
`;
const inputStyles = css`
  padding: 8px 8px;

  font-size: 16px;
  border: none;
  border-radius: 4px;
`;
const nameInputStyles = css`
  padding: 8px 8px;

  font-size: 16px;
  border: none;
  border-radius: 4px;
`;

const inputSubmitStyles = css`
  margin-top: 48px;
  padding: 16px 8px;
  background-color: #edf6fd;
  color: gray;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    box-shadow: lightsalmon;
  }
`;
export default function Checkout(props) {
  const [amountInCart, setAmountInCart] = useState(props.cart);
  useEffect(() => {
    const getAmount = () => {
      console.log(props.cart);
      const priceProduct = props.cart.map((product) => {
        return product.amount;
      });

      const sum = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
      console.log(amountInCart);
    };

    getAmount();
  }, [props.cart, amountInCart]);

  const deleteCookie = (e) => {
    e.preventDefault();
    Cookies.remove('cart');
    // use next router to redirect after submitting form
    Router.push('./thanks').catch((error) => console.log(error));
  };

  console.log(props);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Form to complete payment process" />
      </Head>
      <Layout items={amountInCart}>
        <div css={formContainerStyles}>
          <h1 css={checkoutText}>Checkout</h1>
          <form css={formStyles} id="survey-form" onSubmit={deleteCookie}>
            <div>
              <label htmlFor="first-name">
                <h4> First Name </h4>
              </label>
              <input
                css={nameInputStyles}
                data-test-id="checkout-first-name"
                id="first-name"
                name="first-name"
                placeholder="First Name"
                required
              />
              <label htmlFor="last-name">
                <h4> Last Name </h4>
              </label>
              <input
                css={nameInputStyles}
                data-test-id="checkout-last-name"
                id="last-name"
                name="last-name"
                placeholder="Last Name"
                required
              />

              <label htmlFor="e-mail">
                <h4>E-Mail</h4>{' '}
              </label>
              <input
                css={nameInputStyles}
                type="email"
                data-test-id="checkout-email"
                placeholder="Enter your E-Mail"
                required
              />
            </div>
            <div>
              <label>
                <h4>Adress</h4>
                <input
                  css={inputStyles}
                  type="adress"
                  data-test-id="checkout-address"
                  placeholder="Adress"
                  required
                />
              </label>
              <label>
                <h4>City</h4>
                <input
                  css={inputStyles}
                  data-test-id="checkout-city"
                  placeholder="City"
                  required
                />
              </label>
              <label htmlFor="postal-code">
                <h4>Postal Code</h4>
              </label>
              <input
                css={inputStyles}
                id="postal-code"
                name="postal-code"
                data-test-id="checkout-postal-code"
                placeholder="Postal Code"
                type="number"
                required
              />

              <label>
                <h4>Country</h4>
                <input
                  css={inputStyles}
                  data-test-id="checkout-country"
                  placeholder="Country"
                  required
                />
              </label>
            </div>
            <div css={containerCreditCardStyles}>
              <label>
                <h4>Creditcardnumber</h4>

                <input
                  css={inputStyles}
                  data-test-id="checkout-credit-card"
                  placeholder="1234-5678-9123-4567"
                  required
                />
              </label>

              <label>
                <h4>Expiration date</h4>
                <input
                  css={smallInputStyles}
                  data-test-id="checkout-expiration-date"
                  placeholder="exp. date"
                  required
                />
              </label>
              <label>
                <h4>Security Number</h4>
                <input
                  css={smallInputStyles}
                  data-test-id="checkout-security-code"
                  type="number"
                  placeholder="CVC"
                  required
                />
              </label>
              <input
                css={inputSubmitStyles}
                data-test-id="checkout-confirm-order"
                type="submit"
                value="complete order, really no scam"
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
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
