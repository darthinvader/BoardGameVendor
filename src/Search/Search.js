import { useEffect, useState } from "react";
import gameboardGeekRequest from "../Axios/GameboardGeekRequest";
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
      console.log(response);
      setGames(response.data);
    })();
  }, []);

  // useEffect(() => console.log(games), [games]);

  return <div></div>;
};

export default Search;
