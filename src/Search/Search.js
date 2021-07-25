import { useEffect, useState } from "react";
import gameboardGeekRequest from "../Axios/GameboardGeekRequest";
import { Parser } from "xml2js";
const Search = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await gameboardGeekRequest(
        "search?query=star&type=boardgame,boardgameexpansion,boardgameaccessory"
      );
      console.log(response);
      const parser = new Parser({ explicitArray: false });
      const xml = response.data;

      parser.parseString(xml, (err, result) => {
        if (err) {
          throw err;
        }
        setGames(result["items"]["item"]);
      });
    })();
  }, []);

  return <div></div>;
};

export default Search;
