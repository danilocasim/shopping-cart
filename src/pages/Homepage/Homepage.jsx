import { Link } from "react-router";
import style from "./Homepage.module.css";
import imageSrc from "../../assets/HomePageHeroImage.png";

function Homepage() {
  return (
    <div className={style.container}>
      <div className={style.descriptionWrapper}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet
          consectetur adipiscing elit quisque faucibus ex sapien. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque
          sem placerat in id cursus mi.
        </p>
        <img src={imageSrc} alt='homepage HomePageHeroImage' />
        {/* <img style={style.homepagePic} /> */}
      </div>

      <Link to='/products'>Shop Now!</Link>
    </div>
  );
}
export default Homepage;
