import { useDB } from "../Context/DBContext";
import FavoriteGame from "./FavoriteGame/FavoriteGame";
import styles from "./FavoritesContainer.module.scss";
const FavoritesContainer = () => {
  const games = useDB();
  if (games === "loading") {
    return <p>Loading...</p>;
  }

  const boardGames = games.map((game, i) => (
    <FavoriteGame game={game} key={game.href} />
  ));

  return <div className={styles.BoardGamesContainer}>{boardGames}</div>;
};

export default FavoritesContainer;
