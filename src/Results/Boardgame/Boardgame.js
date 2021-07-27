import { BsClock, BsFillHeartFill } from "react-icons/bs";
import { GiAges } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import styles from "./Boardgame.module.scss";
import useWindowDimensions from "./useWindowDimensions";

const Boardgame = ({ game }) => {
  const { width } = useWindowDimensions();

  const description = game.description;
  const thumbnail = game.thumbnail;
  const maxPlayers = game.maxPlayers;
  const minPlayers = game.minPlayers;
  const minAge = game.minAge;
  const minPlaytime = game.minPlaytime;
  const maxPlaytime = game.maxPlaytime;
  const title = game.name;

  let playtime = `${minPlayers} - ${maxPlayers}`;
  if (minPlaytime === maxPlaytime) {
    playtime = minPlayers;
  }

  let players = `${minPlayers} - ${maxPlayers}`;
  if (minPlayers === maxPlayers) {
    players = minPlayers;
  }

  let subDescription = "";
  if (width >= 550) {
    subDescription = description.substring(0, 500) + "...";
  } else if (width < 370) {
    subDescription = description.substring(0, 140) + "...";
  } else if (width < 400) {
    subDescription = description.substring(0, 200) + "...";
  } else if (width < 550) {
    subDescription = description.substring(0, 300) + "...";
  }
  return (
    <div className={styles.BoardGame}>
      <img alt={title} src={thumbnail} className={styles.Image} />
      <h2 className={styles.Title}>{title}</h2>
      <p className={styles.Description}>{subDescription}</p>
      <div className={styles.Information}>
        <div>
          <IoIosPeople /> {players}
        </div>
        <div>
          <BsClock /> {playtime}
        </div>
        <div>
          <GiAges /> {minAge}+
        </div>
        <div className={styles.Favorite}>
          <BsFillHeartFill />
        </div>
      </div>
    </div>
  );
};

export default Boardgame;
