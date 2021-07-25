import axios from "axios";

const gameboardGeekRequest = axios.create({
  method: "GET",
  baseURL: "https://www.boardgamegeek.com",
  headers: {
    accept: "application/json, text/plain, */*",
  },
});

export default gameboardGeekRequest;
