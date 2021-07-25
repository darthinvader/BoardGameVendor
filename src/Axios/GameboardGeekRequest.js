import axios from "axios";

const gameboardGeekJSONRequest = axios.create({
  method: "GET",
  baseURL: "https://www.boardgamegeek.com",
  headers: {
    accept: "application/json, text/plain, */*",
  },
});

export const gameboardGeekRequest = axios.create({
  method: "GET",
  baseURL: "https://www.boardgamegeek.com",
});

export default gameboardGeekJSONRequest;
