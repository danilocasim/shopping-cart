import style from "./CheckoutProduct.module.css";

function CheckoutProduct({ item, decrement, increment, deleteProduct }) {
  return (
    <div className={style.checkoutProduct}>
      <img
        className={style.productImage}
        key={item.title}
        src={item.image}
        alt={item.title}
        data-testid={item.title}
      />

      <div className={style.description}>
        <div className={style.row}>
          <p>{item.title}</p>
          <button
            data-testid={item.id + "-delete-product"}
            onClick={deleteProduct}
            className={style.delete}
          >
            x
          </button>
        </div>
        <div className={style.buttonWrapper}>
          <button
            onClick={decrement}
            data-testid={item.id + "-decrement-checkout"}
          >
            -
          </button>
          <input
            min={1}
            maxLength={3}
            value={item.quantity}
            data-testid={item.id + "-quantity-checkout"}
            type='tel'
          />
          <button
            onClick={increment}
            data-testid={item.id + "-increment-checkout"}
          >
            +
          </button>
        </div>
        <p className={style.price}>${item.price}</p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
