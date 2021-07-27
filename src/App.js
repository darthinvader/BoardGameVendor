import SearchContainer from "./SearchContainer/SearchContainer";
import { useState } from "react";
import FavoritesContainer from "./FavoritesContainer/FavoritesContainer";

const SEARCH = "SEARCH";
const FAVORITES = "FAVORITES";

function App() {
  const [selectedTab, setSelectedTab] = useState(SEARCH);

  const tab =
    selectedTab === SEARCH ? <SearchContainer /> : <FavoritesContainer />;
  return <div>{tab}</div>;
}

export default App;
