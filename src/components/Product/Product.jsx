import style from "./Product.module.css";

function Product({ data, onClick, onChange, increment, decrement }) {
  return (
    <div className={style.productWrapper}>
      <img className={style.productImage} src={data.image} alt={data.title} />

      <div className={style.description}>
        <p>{data.title}</p>
        <p>${data.price}</p>
        <div className={style.buttonWrapper}>
          <div className={style.quantityBtn}>
            <button onClick={decrement} data-testid={data.id + "-decrement"}>
              -
            </button>
            <input
              min={1}
              maxLength={3}
              value={data.quantity}
              data-testid={data.id + "-quantity"}
              type='tel'
              onChange={onChange}
            />
            <button onClick={increment} data-testid={data.id + "-increment"}>
              +
            </button>
          </div>
          <button
            className={style.addToCartBtn}
            onClick={onClick}
            data-testid={data.title}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
