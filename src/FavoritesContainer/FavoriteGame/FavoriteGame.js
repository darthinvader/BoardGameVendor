import { useState } from "react";
import useWindowDimensions from "../../Results/Boardgame/useWindowDimensions";
import styles from "./FavoriteGame.module.scss";
import { BsClock, BsFillHeartFill } from "react-icons/bs";
import { GiAges } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const FavoriteGame = (game) => {
  const [notes, setNotes] = useState(game.notes);

  const { width } = useWindowDimensions();
  const description = game.description;
  const thumbnail = game.thumbnail;
  const maxPlayers = game.maxPlayers;
  const minPlayers = game.minPlayers;
  const minAge = game.minAge;
  const minPlaytime = game.minPlaytime;
  const maxPlaytime = game.maxPlaytime;

  let title = game.name;
  if (game.yearPublished) {
    title += `(${game.yearPublished})`;
  }

  let playtime = `${minPlaytime} - ${maxPlaytime}`;
  if (minPlaytime === maxPlaytime) {
    playtime = minPlaytime;
  }

  let players = `${minPlayers} - ${maxPlayers}`;
  if (minPlayers === maxPlayers) {
    players = minPlayers;
  }

  let subDescription = "";
  if (width >= 1000) {
    subDescription = description.substring(0, 700) + "...";
  } else if (width < 370) {
    subDescription = description.substring(0, 140) + "...";
  } else if (width < 400) {
    subDescription = description.substring(0, 200) + "...";
  } else if (width < 550) {
    subDescription = description.substring(0, 300) + "...";
  } else if (width < 1000) {
    subDescription = description.substring(0, 500) + "...";
  }
  return (
    <div className={styles.BoardGame}>
      <img alt={title} src={thumbnail} className={styles.Image} />
      <h2 className={styles.Title}>{title}</h2>
      <p className={styles.Description}>{subDescription}</p>
      <textarea
        className="Textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
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
        <div className={styles.Favorite + " " + styles.active}>
          <BsFillHeartFill />
        </div>
      </div>
    </div>
  );
};

export default FavoriteGame;
