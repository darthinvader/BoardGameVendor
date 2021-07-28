import SearchContainer from "./SearchContainer/SearchContainer";
import FavoritesContainer from "./FavoritesContainer/FavoritesContainer";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className={styles.Container}>
        <Navbar />
        <Route exact path="/">
          <SearchContainer />
        </Route>
        <Route exact path="/Favorites" component={FavoritesContainer} />
      </div>
    </Router>
  );
}

export default App;
