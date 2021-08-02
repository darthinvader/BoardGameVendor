import { useDB } from "../Context/DBContext";
import FavoriteGame from "./FavoriteGame/FavoriteGame";

const FavoritesContainer = () => {
  const games = useDB();
  console.log(games);
  if (games === "loading") {
    return <p>Loading...</p>;
  }

  const boardGames = games.map((game, i) => (
    <FavoriteGame game={game} key={game.title + i.toString()} />
  ));

  return null;
};

export default FavoritesContainer;
