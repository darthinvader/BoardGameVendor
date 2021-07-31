import { useDB } from "../Context/DBContext";

const FavoritesContainer = () => {
  const games = useDB();

  return <p>Loading...</p>;
};

export default FavoritesContainer;
