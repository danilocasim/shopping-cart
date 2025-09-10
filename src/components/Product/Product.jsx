import style from "./Product.module.css";

function Product({ data, onClick, onChange, increment, decrement }) {
  return (
    <div className={style.productWrapper}>
      <img className={style.productImage} src={data.image} alt={data.title} />

      <p>{data.title}</p>
      <div className={style.buttonWrapper}>
        <button onClick={decrement} data-testid={data.id + "-decrement"}>
          -
        </button>
        <input
          min={1}
          max={999}
          value={data.quantity}
          data-testid={data.id + "-quantity"}
          type='tel'
          onChange={onChange}
        />
        <button onClick={increment} data-testid={data.id + "-increment"}>
          +
        </button>
      </div>
      <button onClick={onClick} data-testid={data.title}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
