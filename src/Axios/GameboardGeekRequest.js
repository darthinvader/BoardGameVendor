import axios from "axios";

const gameboardGeekRequest = axios.create({
  method: "GET",
  baseURL: "https://www.boardgamegeek.com/xmlapi2",
});

export default gameboardGeekRequest;
