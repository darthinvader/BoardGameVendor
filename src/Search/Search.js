import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Search.module.scss";
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
        onKeyUp={(e) => (e.key === "Enter" ? search(searchTerm) : null)}
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
