import { useEffect, useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";

const Search = () => {
  const [games, setGames] = useState([]);
  const search = async (searchTerm) => {
    searchTerm.replaceAll(" ", "+");
    const response = await gameboardGeekRequest(
      `/search/boardgame?q=${searchTerm}&showcount=2`
    );
    const gamesData = response.data.items;

    console.log(gamesData[0]);
    for (const gameData of gamesData) {
      getAndSetGame(gameData);
    }
  };

  useEffect(() => {
    search("star wars");
  }, []);

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
    console.log(thingGame);
    game.description = thingGame?.description;
    game.thumbnail = thingGame?.thumbnail;
    game.maxPlayers = thingGame?.maxplayers?.$;
    game.minPlayers = thingGame?.minplayers?.$;
    game.minAge = thingGame?.minage?.$;
    game.minPlaytime = thingGame?.minplaytime?.$;
    game.maxPlaytime = thingGame?.maxplaytime?.$;

    // Atomic set operation because getItemById is async.
    setGames((oldState) => {
      oldState.push(game);
      console.log(games);
      return oldState;
    });
  };

  return <div></div>;
};

export default Search;
