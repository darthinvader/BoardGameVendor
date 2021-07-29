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
      <Link className={styles.NavElement + " " + SearchActive} to="/">
        Search
      </Link>
      <Link
        className={styles.NavElement + " " + FavoritesActive}
        to="/Favorites"
      >
        Favorites
      </Link>
    </div>
  );
};

export default Navbar;
