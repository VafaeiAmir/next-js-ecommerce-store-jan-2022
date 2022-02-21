import { css } from '@emotion/react';
import Header from './Header';

const childrenStyle = css`
  display: grid;
  justify-items: center;
`;
export default function Layout(props) {
  return (
    <>
      <Header quantity={props.quantity} />
      <main css={childrenStyle}>{props.children}</main>
    </>
  );
}
