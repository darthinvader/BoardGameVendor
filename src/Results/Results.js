import Boardgame from "./Boardgame/Boardgame";
import styles from "./Results.module.scss";

const Results = ({ games }) => {
  if (games === NO_GAMES_FOUND) {
    return <div className="no-results">No results found</div>;
  }
  if (games.length === 0) {
    console.log("Hello");
    return null;
  }
  console.log("LETS GO GAMES");
  const boardGames = games.map((game) => (
    <Boardgame game={game} key={game.description} />
  ));
  console.log(boardGames);
  return <div className={styles.GamesContainer}>{boardGames}</div>;
};

export const NO_GAMES_FOUND = "No games found";

export default Results;
