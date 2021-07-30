import { useState, useEffect } from "react";

const DBContext = React.createContext("loading");

const DBProvider = ({ children }) => {
  const [DBGames, setDBGames] = useState("loading");

  return <DBContext.Provider value={DBGames}>{children}</DBContext.Provider>;
};

export default DBProvider;
