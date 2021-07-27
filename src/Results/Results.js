import Boardgame from "./Boardgame/Boardgame";
import styles from "./Results.module.scss";

const Results = ({ games }) => {
  if (games === NO_GAMES_FOUND) {
    return <div className="no-results">No results found</div>;
  }
  if (games === GAMES_DOWNLOAD_ERROR) {
    return <div className="error">Error</div>;
  }
  if (games === GAMES_LOADING) {
    return <div className="error">Loading</div>;
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
export const GAMES_DOWNLOAD_ERROR = "Games Download Error";
export const GAMES_LOADING = "Games Loading";
export default Results;
