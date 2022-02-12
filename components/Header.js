import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const headerStyles = (DarkMode) => {
  return css`
    background-color: ${DarkMode ? 'hsl(236, 97%, 15%)' : 'transparent'};
    color: ${DarkMode ? 'white' : 'hsl(236, 97%, 15%)'};
    padding: 8px 8px;
    border-radius: 10px;
    margin: 5px 20px 5px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    display: flex;
    justify-content: right;
    a + a {
      margin-left: 30px;
    }
  `;
};
export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  function darkModeToggle() {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    setLocalStorage('darkMode', newDarkMode);
  }

  useEffect(() => {
    const myDarkMode = getLocalStorage('darkMode') || false;
    setDarkMode(myDarkMode);
  }, []);

  return (
    <header css={headerStyles(darkMode)}>
      <button onClick={() => darkModeToggle()}>
        Dark {darkMode ? 'on' : 'off'}
      </button>
      <a> </a>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="./logIn">
        <a>Log In</a>
      </Link>
      <Link href="./shopping">
        <a>Shopping</a>
      </Link>
    </header>
  );
}
