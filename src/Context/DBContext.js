import axios from "axios";
import React, { useState, useEffect } from "react";

export const useDB = () => DBContext;
export const useDBUpdatae = () => DBUpdateContext;

const DBContext = React.createContext("loading");
const DBUpdateContext = React.createContext();

const DBProvider = ({ children }) => {
  const [DBGames, setDBGames] = useState("loading");

  useEffect(() => {
    updateDBGames();
  }, []);

  const updateDBGames = async () => {
    const games = axios.get("http://localhost:8080/games");
    setDBGames(await games.data);
  };

  return (
    <DBContext.Provider value={DBGames}>
      <DBUpdateContext.Provider value={updateDBGames}>
        {children}
      </DBUpdateContext.Provider>
    </DBContext.Provider>
  );
};

export default DBProvider;
