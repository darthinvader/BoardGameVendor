import { BrowserRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <BrowserRouter>
        <div className={styles.NavElement + " " + SearchActive}>
          <Link to="/">Search</Link>
        </div>
        <div className={styles.NavElement + " " + FavoritesActive}>
          <Link to="/Favorites">Favorites</Link>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Navbar;
