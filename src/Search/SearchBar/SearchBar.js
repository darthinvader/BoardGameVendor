import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.scss";
const SearchBar = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        className={styles.SearchBarInput}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => search(searchTerm)}
        className={styles.SearchBarButton}
      >
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
