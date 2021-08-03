import { useEffect, useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";
import Results, {
  GAMES_DOWNLOAD_ERROR,
  GAMES_LOADING,
  NO_GAMES_FOUND,
} from "../Results/Results";
import SearchBar from "../Search/Search";

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (searchTerm === "") return;

    // If the user types something in the search bar, cancel the previous request
    let canceled = false;

    // When the search activates , we need to fetch the games from the json API from BoardGameGeeks
    // Note you need to go to https://cors-anywhere.herokuapp.com/corsdemo to activate it
    setGames((oldState) => {
      if (canceled) {
        return oldState;
      }
      return GAMES_LOADING;
    });
    const requestSearchTerm = searchTerm.replaceAll(" ", "+");

    (async () => {
      const response = await gameboardGeekRequest(
        `/search/boardgame?q=${requestSearchTerm}&showcount=10`
      );
      const gamesData = response?.data?.items;
      if (!gamesData) {
        return;
      }
      console.log(gamesData);
      if (gamesData.length === 0) {
        setGames((oldState) => {
          if (canceled) {
            return oldState;
          }
          console.log("HERE");
          return NO_GAMES_FOUND;
        });
        return;
      }

      // Gets all the games Promises from the xml api of boardgamegeek.com and then resolve them
      let mappedGames = gamesData.map((game) => getGameById(game, canceled));

      // Fullfiling all promises
      try {
        mappedGames = await Promise.all(mappedGames);
      } catch (e) {
        console.log(e);
        setGames((oldState) => {
          if (canceled) {
            return oldState;
          }
          return GAMES_DOWNLOAD_ERROR;
        });
      }
      // Set the games if the search was not canceled
      setGames((oldState) => {
        if (canceled) {
          return oldState;
        }
        return mappedGames;
      });
    })();

    return () => {
      canceled = true;
    };
  }, [searchTerm]);

  // Gets all the games from the xml api of boardgamegeek.com
  const getGameById = async (game, canceled) => {
    if (canceled) {
      return;
    }
    const id = game.id;
    const response = await gameboardGeekJSONRequest(`xmlapi2/thing?id=${id}`);
    const parser = new Parser({ explicitArray: false });
    const xml = response.data;
    const par = await parser.parseStringPromise(xml);
    const thingGame = par?.items?.item;

    // Guard clause
    if (!thingGame) {
      return null;
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

    return game;
  };

  return (
    <>
      <SearchBar setTerm={setSearchTerm} />
      <Results games={games} />
    </>
  );
};

export default SearchContainer;
