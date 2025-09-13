import style from "./CheckoutResponse.module.css";
import { Link } from "react-router";
function CheckoutResponse() {
  return (
    <div className={style.wrapper}>
      <h1 className={style.logo}>Shoplifts</h1>
      <h2>Thank you for your purchase</h2>
      <p>ORDER NO. 345657491347</p>
      <p>WE WILL SEND YOU ANOTHER EMAIL WHEN IT IS IN TRANSIT</p>

      <button className={style.trackBtn}>
        <Link
          to={
            "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1"
          }
        >
          TRACK YOUR ORDER HERE
        </Link>
      </button>
    </div>
  );
}

export default CheckoutResponse;
