import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

export const useDB = () => DBContext;
export const useDBUpdate = () => DBUpdateContext;

const DBContext = React.createContext("loading");
const DBUpdateContext = React.createContext({});

const DBProvider = ({ children }) => {
  const [DBGames, setDBGames] = useState("loading");

  const getDBGames = useCallback(async () => {
    const games = await axios.get("http://localhost:8080/games");
    setDBGames(await games.data);
  }, []);

  const addGameToDB = useCallback(
    (game) => {
      const newGame = { ...game };
      newGame.description = "";
      axios.post(`http://localhost:8080/games`, newGame).then(() => {
        getDBGames();
      });
    },
    [getDBGames]
  );

  const updateGame = useCallback(
    (game, description) => {
      const id = game.id;
      const update = { description };

      axios
        .patch(`http://localhost:8080/games/${id}`, update)
        .then(getDBGames());
    },
    [getDBGames]
  );

  const deleteGame = useCallback(
    (id) => {
      axios.delete(`http://localhost:8080/games/${id}`).then(getDBGames());
    },
    [getDBGames]
  );

  useEffect(() => {
    getDBGames();
  }, [getDBGames]);

  return (
    <DBContext.Provider value={DBGames}>
      <DBUpdateContext.Provider
        value={{ getDBGames, addGameToDB, updateGame, deleteGame }}
      >
        {children}
      </DBUpdateContext.Provider>
    </DBContext.Provider>
  );
};

export default DBProvider;
