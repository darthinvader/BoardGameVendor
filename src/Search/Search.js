import { useEffect, useState } from "react";
import { Parser } from "xml2js";
import gameboardGeekJSONRequest, {
  gameboardGeekRequest,
} from "../Axios/GameboardGeekRequest";

const Search = () => {
  const [games, setGames] = useState([]);
  const search = (searchTerm) => {
    searchTerm.replaceAll(" ", "+");
  };

  useEffect(() => {
    (async () => {
      const response = await gameboardGeekRequest(
        "/search/boardgame?q=star+wars&showcount=20"
      );
      setGames(() => response.data);
    })();

    getItemsById("187645");
  }, []);

  const getItemsById = async (id, index) => {
    const response = await gameboardGeekJSONRequest(`xmlapi2/thing?id=${id}`);
    const parser = new Parser({ explicitArray: false });
    const xml = response.data;
    parser.parseString(xml, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      const item = result.items.item;
      const thumbnail = item.thumbnail;
      const minPlayers = item.minplayers.$.value;
      const maxPlayers = item.maxplayers.$.value;
      const minPlayTime = item.minplaytime.$.value;
      const maxPlayTime = item.maxplaytime.$.value;
      const minAge = item.minage.$.value;
      const description = item.description;

      setGames((games) => {});
    });
  };

  useEffect(() => console.log(games), [games]);

  return <div></div>;
};

export default Search;
