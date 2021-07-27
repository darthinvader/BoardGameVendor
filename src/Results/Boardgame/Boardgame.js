import { BsClock, BsFillHeartFill } from "react-icons/bs";
import { GiAges } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import styles from "./Boardgame.module.scss";

const Boardgame = ({ game }) => {
  const description = game.description;
  const thumbnail = game.thumbnail;
  const maxPlayers = game.maxPlayers;
  const minPlayers = game.minPlayers;
  const minAge = game.minAge;
  const minPlaytime = game.minPlaytime;
  const maxPlaytime = game.maxPlaytime;
  const title = game.name;

  return (
    <div className={styles.Boardgame}>
      <img alt={title} src={thumbnail} className={styles.Image} />
      <h2 className={styles.Title}>{title}</h2>
      <p className={styles.Description}>{description}</p>
      <div className={styles.Information}>
        <div>
          <IoIosPeople /> {minPlayers}-{maxPlayers}
        </div>
        <div>
          <BsClock /> {minPlaytime}-{maxPlaytime}
        </div>
        <div>
          <GiAges /> {minAge}+
        </div>
        <div>
          <BsFillHeartFill />
        </div>
      </div>
    </div>
  );
};

export default Boardgame;
