export const NO_GAMES_FOUND = "No games found";

const Results = ({ games }) => {
  if (games === NO_GAMES_FOUND) {
    return <div className="no-results">No results found</div>;
  }
  if (games.length === 0) {
    return null;
  }
  return null;
};

export default Results;
