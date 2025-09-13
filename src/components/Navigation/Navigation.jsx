import { Link } from "react-router";
import style from "./Navigation.module.css";
import { ShoppingCart } from "lucide-react";

const Navigation = ({ itemLength }) => {
  return (
    <nav className={style.navigation}>
      <div className='logo'>
        <Link to='/'>
          <h1>Shoplifts</h1>
        </Link>
      </div>
      <div className={style.navItems}>
        <Link to='/products'>Collections</Link>
        <Link
          data-testid='checkoutLink'
          className={style.checkout}
          to='/checkout'
        >
          <span>{itemLength !== 0 ? itemLength : null}</span>
          <ShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
