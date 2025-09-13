import { Fragment } from "react";
import style from "./SummaryReport.module.css";
import { Link } from "react-router";

function SummaryReport({ items, checkout }) {
  const shippingFee = 10;
  const allProductsTotalPrice = items
    .reduce((acc, curr) => {
      if (curr.quantity > 1) return curr.quantity * curr.price + acc;
      return acc + curr.price;
    }, 0)
    .toFixed(2);

  return (
    <div className={style.summaryReportWrapper}>
      <h3>Order Summary</h3>

      <div className={style.row}>
        <p className={style.light}>SUBTOTAL</p>
        <p data-testid='allProductsTotalPrice'>${allProductsTotalPrice}</p>
      </div>
      <div className={style.row}>
        <p className={style.light}>SHIPPING FEE</p>
        <p>${shippingFee}</p>
      </div>
      <div className={style.row}>
        <p className={style.light}>TOTAL</p>
        <p>${Number(allProductsTotalPrice) + shippingFee}</p>
      </div>
      <Link
        className={style.checkoutBtn}
        data-testid='checkout'
        onClick={checkout}
        to='/receipt'
      >
        CHECKOUT
      </Link>
    </div>
  );
}

export default SummaryReport;
