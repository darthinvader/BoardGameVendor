import axios from "axios";
import { useEffect, useState } from "react";

const FavoritesContainer = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const games = await axios.get("http://localhost:8080/games");
      setGames(games.data);
    })();
  }, []);

  return <p>Loading...</p>;
};

export default FavoritesContainer;
