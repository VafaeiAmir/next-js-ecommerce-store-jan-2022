import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  background-color: hsl(236, 97%, 15%);
  color: white;
  padding: 15px 15px;
  border-radius: 10px;
  margin: 8px 8px 20px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.2rem;
  display: flex;
  justify-content: right;
  a + a {
    margin-left: 20px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="./contact">
        <a>Contact</a>
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
