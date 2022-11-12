const express = require("express");
const db = require("./config/connection");
// listening at port 3001
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));

// running server
db.once("open", () => {
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log(`API server is now running on port ${PORT}!`);
  });
});
