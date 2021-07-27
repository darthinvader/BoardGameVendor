import { useEffect, useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";
import Results, { NO_GAMES_FOUND } from "../Results/Results";
import SearchBar from "../Search/Search";
import styles from "./Container.module.scss";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    let canceled = false;

    // When the search activates , we need to fetch the games from the json API from BoardGameGeeks
    // Note you need to deactivate CORS in the browser if you are running on localhost
    // Todo this in windows go to your chrome or chromium engine browser folder and run
    // launcher.exe --disable-web-security --user-data-dir="c:\nocorsbrowserdata"
    (async () => {
      setGames((oldState) => {
        if (canceled) {
          return oldState;
        }
        return [];
      });
      const requestSearchTerm = searchTerm.replaceAll(" ", "+");
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

      // Gets the game from the xml api of boardgamegeek.com and sets it in the state
      let mappedGames = gamesData.map(async (game) => {
        const id = game.id;
        const response = await gameboardGeekJSONRequest(
          `xmlapi2/thing?id=${id}`
        );
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
      });
      // Fullfiling all promises
      mappedGames = await Promise.all(mappedGames);

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

  return (
    <div className={styles.Container}>
      <SearchBar setTerm={setSearchTerm} />
      <Results games={games} />
    </div>
  );
};

export default Search;
