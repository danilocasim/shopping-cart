import { Fragment } from "react";
import { useOutletContext } from "react-router";
import style from "./Checkout.module.css";
function Checkout() {
  const [checkoutItems, setCheckoutItems] = useOutletContext();

  function decrement(index) {
    const newCheckoutItems = [...checkoutItems];

    newCheckoutItems[index].quantity--;

    if (newCheckoutItems[index].quantity === 0) {
      newCheckoutItems.splice(index, 1);
    }
    setCheckoutItems(newCheckoutItems);
  }

  function increment(index) {
    const newCheckoutItems = [...checkoutItems];
    newCheckoutItems[index].quantity++;

    setCheckoutItems(newCheckoutItems);
  }

  function deleteProduct(index) {
    const newCheckoutItems = [...checkoutItems];
    newCheckoutItems.splice(index, 1);
    setCheckoutItems(newCheckoutItems);
  }

  function removeAllProducts() {
    setCheckoutItems([]);
  }

  if (checkoutItems.length === 0)
    return <h1 className={style.emptyMessage}>YOUR CART IS EMPTY</h1>;

  return (
    <Fragment>
      <div className={style.checkoutWrapper}>
        <div className={style.checkoutProducts}>
      {checkoutItems &&
            checkoutItems.map((item, index) => {
          return (
            <Fragment key={item.id}>
                  <CheckoutProduct
                    item={item}
                    decrement={() => decrement(index)}
                    increment={() => increment(index)}
                    deleteProduct={() => deleteProduct(index)}
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
