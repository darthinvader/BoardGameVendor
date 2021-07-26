import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.scss";
const SearchBar = () => {
  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        className={styles.SearchBarInput}
        placeholder="Search"
      />
      <button className={styles.SearchBarButton}>
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
