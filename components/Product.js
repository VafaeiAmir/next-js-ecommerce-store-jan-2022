// // import { useState } from 'react';
// import styles from '../styles/Home.module.css';
// import { Counter } from './Counter';

// export function Product({ clickHandler, productPrice, setQuantity, quantity }) {
//   // const [quantity, setQuantity] = useState(1);
//   // create a func that will handle add to cart

//   return (
//     <div className={styles.card}>
//       <p>
//         This is a one time payment <span>product</span>.
//       </p>

//       <div>
//         <Counter currentValue={quantity} newValueSetter={setQuantity} />
//       </div>
//       <button
//         className={styles.button}
//         onClick={() =>
//           clickHandler(productPrice.mode, productPrice.priceId, quantity)
//         }
//       >
//         Add to cart
//       </button>
//     </div>
//   );
// }
