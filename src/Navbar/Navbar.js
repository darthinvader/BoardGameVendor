import { useLocation, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const location = useLocation();
  console.log(location);

  let SearchActive = "";
  let FavoritesActive = "";

  if (location.pathname === "/") {
    SearchActive = styles.NavElementActive;
  } else {
    FavoritesActive = styles.NavElementActive;
  }

  return (
    <div className={styles.Navbar}>
      <Link to="/">
        <div className={styles.NavElement + " " + SearchActive}>Search</div>
      </Link>
      <Link to="/Favorites">
        <div className={styles.NavElement + " " + FavoritesActive}>
          Favorites
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
