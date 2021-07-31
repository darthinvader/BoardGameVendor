import axios from "axios";
import React, { useState, useEffect } from "react";

export const useDB = () => DBContext;
export const useDBUpdatae = () => DBUpdateContext;

const DBContext = React.createContext("loading");
const DBUpdateContext = React.createContext();

const DBProvider = ({ children }) => {
  const [DBGames, setDBGames] = useState("loading");

  useEffect(() => {
    getDBGames();
  }, []);

  const getDBGames = async () => {
    const games = await axios.get("http://localhost:8080/games");
    setDBGames(await games.data);
  };

  const addGameToDB = (game) => {
    const newGame = { ...game };
    newGame.description = "";
    axios.post(`http://localhost:8080/games`, newGame).then(() => {
      getDBGames();
    });
    console.log(game);
  };

  const updateGame = (game, description) => {
    const id = game.id;
    const update = { description };

    axios.patch(`http://localhost:8080/games/${id}`, update).then(getDBGames());
  };

  const deleteGame = (id) => {
    axios.delete(`http://localhost:8080/games/${id}`).then(getDBGames());
  };

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
