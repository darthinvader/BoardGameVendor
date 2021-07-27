import { useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";
import Results, { NO_GAMES_FOUND } from "../Results/Results";
import SearchBar from "../Search/Search";
import styles from "./Container.module.scss";

const Search = () => {
  const [games, setGames] = useState([]);
  // When the search activates , we need to fetch the games from the json API from BoardGameGeeks
  // Note you need to deactivate CORS in the browser if you are running on localhost
  // Todo this in windows go to your chrome or chromium engine browser folder and run
  // launcher.exe --disable-web-security --user-data-dir="c:\nocorsbrowserdata"
  const search = async (searchTerm) => {
    setGames(() => []);
    const requestSearchTerm = searchTerm.replaceAll(" ", "+");
    const response = await gameboardGeekRequest(
      `/search/boardgame?q=${requestSearchTerm}&showcount=10`
    );
    const gamesData = response.data.items;
    if (gamesData.length === 0) {
      setGames(() => NO_GAMES_FOUND);
    }
    for (const gameData of gamesData) {
      getAndSetGame(gameData);
    }
  };

  // Gets the game from the xml api of boardgamegeek.com and sets it in the state
  const getAndSetGame = async (game) => {
    const id = game.id;
    const response = await gameboardGeekJSONRequest(`xmlapi2/thing?id=${id}`);
    const parser = new Parser({ explicitArray: false });
    const xml = response.data;
    const par = await parser.parseStringPromise(xml);
    const thingGame = par?.items?.item;

    // Guard clause
    if (!thingGame) {
      return;
    }
    // description also needs to remove all special html character like &#10
    game.description = thingGame?.description?.replace(/&(.*?);/gi, "");
    game.thumbnail = thingGame?.thumbnail;
    game.maxPlayers = thingGame?.maxplayers?.$.value;
    game.minPlayers = thingGame?.minplayers?.$.value;
    game.minAge = thingGame?.minage?.$.value;
    game.minPlaytime = thingGame?.minplaytime?.$.value;
    game.maxPlaytime = thingGame?.maxplaytime?.$.value;
    game.yearPublished = thingGame?.yearpublished?.$.value;
    // Atomic set operation because getItemByI`d is async.
    setGames((oldState) => {
      const destructedOldState = [...oldState];
      destructedOldState.push(game);
      return destructedOldState;
    });
  };

  return (
    <div className={styles.Container}>
      <SearchBar search={search} />
      <Results games={games} />
    </div>
  );
};

export default Search;
