import { useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";
import Results, { NO_GAMES_FOUND } from "../Results/Results";
import SearchBar from "./SearchBar/SearchBar";

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
    game.description = thingGame?.description;
    game.thumbnail = thingGame?.thumbnail;
    game.maxPlayers = thingGame?.maxplayers?.$;
    game.minPlayers = thingGame?.minplayers?.$;
    game.minAge = thingGame?.minage?.$;
    game.minPlaytime = thingGame?.minplaytime?.$;
    game.maxPlaytime = thingGame?.maxplaytime?.$;
    // Atomic set operation because getItemByI`d is async.
    setGames((oldState) => {
      const destructedOldState = [...oldState];
      destructedOldState.push(game);
      return destructedOldState;
    });
  };

  return (
    <>
      <SearchBar search={search} />
      <Results games={games} />
    </>
  );
};

export default Search;
