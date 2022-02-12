import { useState } from 'react';
import Layout from '../components/Layout';

export default function Atari() {
  const [count, setCount] = useState(1);

  function handleClickPlusCount() {
    setCount(count + 1);
  }
  function handleClickMinusCount() {
    // if it get the number 1, it is not going to count down anymore
    if (count === 1) {
      return;
    }

    // counting down the quantity
    setCount(count - 1);
  }

  return (
    <Layout>
      <h1>ATARI</h1>
      <img src="./1.jpg" alt="AtariPic" width={200} height={200} />
      <p>This is the Atari page</p>
      <div>
        <button>😍</button>
      </div>
      <div>
        <button onClick={() => handleClickPlusCount()}>+</button>
        <button onClick={() => handleClickMinusCount()}>-</button>
      </div>
      <div>{count}</div>

      <button>Add to shop</button>
    </Layout>
  );
}
