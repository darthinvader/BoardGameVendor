<h1 align="center">
  Board game vendor
</h1>
This is a react based application power by create-react-app to search board games and save them as favorites in a json-server through axios.

---

<h2>Search</h2>

The search functionality uses axios to post a request to the json api of boardgamegeek. In order to do that it uses an intermidiate site called <a href="https://cors-anywhere.herokuapp.com/corsdemo">cors-anywhere</a> to bypass the cors restrictions in the browser.

Search fetches the ten(10) first results and displays them.

You can hit the little heart icon to add the board game to your favorites list through an axios request to an internal json-server.

![Search Preview](https://i.imgur.com/IiQIPSjh.png)

---

<h2>Favorites</h2>
 
Favorites use axios to get, delete and update the favorites from the json-server. You can delete a favorite by clicking on the little red heart icon.
![Favorites Preview](https://i.imgur.com/oLcRg9vh.png)

---

<h2>Technologies</h2>

- Reactjs
- Axios
- json-server
- CRUD
- SPA(Single Page Application)
- scss

---

<h2>Setup</h2>

Clone this repo and run `npm install` to install all dependencies.

Then run `npm install -g json-server` to install json server globally.

---

<h2>Usage</h2>

After completing the setup above, go to the root folder and run `npm run db` to start the json-server.

Then run `npm start` to start the server and open the app in your browser.
