import { useDB } from "../Context/DBContext";
import FavoriteGame from "./FavoriteGame/FavoriteGame";

const FavoritesContainer = () => {
  const games = useDB();
  if (games === "loading") {
    return <p>Loading...</p>;
  }

  const boardGames = games.map((game, i) => (
    <FavoriteGame game={game} key={game.href} />
  ));

  return <div>{boardGames}</div>;
};

export default FavoritesContainer;
