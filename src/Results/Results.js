import styles from "./Results.module.scss";

const Results = ({ games }) => {
  if (games === NO_GAMES_FOUND) {
    return <div className="no-results">No results found</div>;
  }
  if (games.length === 0) {
    return null;
  }

  return <div className={styles.GamesContainer}>kjh</div>;
};

export const NO_GAMES_FOUND = "No games found";

export default Results;
