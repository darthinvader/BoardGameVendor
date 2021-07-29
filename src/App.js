import SearchContainer from "./SearchContainer/SearchContainer";
import FavoritesContainer from "./FavoritesContainer/FavoritesContainer";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className={styles.Container}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SearchContainer />
          </Route>
          <Route exact path="/Favorites">
            <FavoritesContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
