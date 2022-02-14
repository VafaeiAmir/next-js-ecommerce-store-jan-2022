import { useState } from 'react';
import { Counter } from './Counter';

export function Product({ clickHandler, productPrice }) {
  const [quantity, setQuantity] = useState(1);
  const currencySymbol = {
    eur: '€',
    us: '$',
  };

  return (
    <div>
      <p>
        This is a one time payment <span>product</span>.
      </p>
      <div>
        <img src="/product-pic/.jpg" alt="product-pics" />
        <Counter currentValue={quantity} newValueSetter={setQuantity} />
      </div>
      <button
        onClick={() =>
          clickHandler(productPrice.mode, productPrice.priceId, quantity)
        }
      >
        Buy for {currencySymbol[productPrice.currency]}{' '}
        {(productPrice.unitAmount / 100) * quantity}
      </button>
    </div>
  );
}
