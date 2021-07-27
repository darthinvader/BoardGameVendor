import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Search.module.scss";
const SearchBar = ({ setTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        className={styles.SearchBarInput}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => (e.key === "Enter" ? setTerm(searchTerm) : null)}
      />
      <button
        onClick={() => setTerm(searchTerm)}
        className={styles.SearchBarButton}
      >
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
