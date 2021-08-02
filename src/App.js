import SearchContainer from "./SearchContainer/SearchContainer";
import FavoritesContainer from "./FavoritesContainer/FavoritesContainer";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import DBProvider from "./Context/DBContext";

function App() {
  return (
    <DBProvider>
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
    </DBProvider>
  );
}

export default App;
