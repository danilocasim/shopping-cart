import { Fragment } from "react";
import { useOutletContext } from "react-router";
import style from "./Checkout.module.css";
function Checkout() {
  const [checkoutItems, setCheckoutItems] = useOutletContext();

  return (
    <div>
      <h1>Checkout</h1>
      {checkoutItems &&
        checkoutItems.map((item) => {
          return (
            <Fragment key={item.id}>
              <img
                className={style.productImage}
                key={item.title}
                src={item.image}
                alt={item.title}
                data-testid={item.title}
              />
              <p>{item.title}</p>
              <p>{item.quantity}</p>
            </Fragment>
          );
        })}
    </div>
  );
}

export default Checkout;
