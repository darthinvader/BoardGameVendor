import SearchContainer from "./SearchContainer/SearchContainer";
import { useState } from "react";
import FavoritesContainer from "./FavoritesContainer/FavoritesContainer";
import styles from "./App.module.scss";
const SEARCH = "search";
const FAVORITES = "favorites";

function App() {
  const [selectedTab, setSelectedTab] = useState(SEARCH);

  const tab =
    selectedTab === SEARCH ? <SearchContainer /> : <FavoritesContainer />;

  const SearchActive = selectedTab === SEARCH ? styles.NavElementActive : "";
  const FavoritesActive =
    selectedTab === FAVORITES ? styles.NavElementActive : "";
  return (
    <div className={styles.Container}>
      <nav className={styles.Navbar}>
        <div className={styles.NavElement + " " + SearchActive}>Search</div>
        <div className={styles.NavElement + " " + FavoritesActive}>
          Favorites
        </div>
      </nav>
      {tab}
    </div>
  );
}

export default App;
