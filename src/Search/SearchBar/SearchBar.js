import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.scss";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        className={styles.SearchBarInput}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.SearchBarButton}>
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
