import { Link } from "react-router";
import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={style.navigation}>
      <div className='logo'>
        <Link to='/'>
          <h1>Shoplifts</h1>
        </Link>
      </div>
      <div className={style.navItems}>
        <Link to='/products'>Products</Link>
        <Link to='/checkout'>Checkout</Link>
      </div>
    </nav>
  );
};

export default Navigation;
