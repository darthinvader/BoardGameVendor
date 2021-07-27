import Boardgame from "./Boardgame/Boardgame";
import styles from "./Results.module.scss";

const Results = ({ games }) => {
  if (games === NO_GAMES_FOUND) {
    return <div className="no-results">No results found</div>;
  }
  if (games.length === 0) {
    return null;
  }
  const boardGames = games.map((game, i) => (
    <Boardgame game={game} key={game.title + i.toString()} />
  ));
  return <div className={styles.BoardGamesContainer}>{boardGames}</div>;
};

export const NO_GAMES_FOUND = "No games found";

export default Results;
