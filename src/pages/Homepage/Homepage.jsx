import { Link } from "react-router";
import style from "./Homepage.module.css";
import imageSrc from "../../assets/HomePageHeroImage.png";

function Homepage() {
  return (
    <div className={style.container}>
      <div className={style.descriptionWrapper}>
        <h1>Welcome to Shoplifts.</h1>
        <p data-testid='homepageDescription'>
          From everyday essentials to unique finds, we bring all kinds of
          products together in one place. Our goal is to make shopping simple,
          fun, and affordable for everyone. Whatever you’re looking for, you’ll
          find it here at Shoplifts.
        </p>
        <Link to='/products'>Shop Now!</Link>
      </div>

      <img
        data-testid='heroImage'
        src={imageSrc}
        alt='homepage HomePageHeroImage'
      />
    </div>
  );
}

export default Homepage;
