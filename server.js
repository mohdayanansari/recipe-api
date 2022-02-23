const express = require("express");
const app = express();
require("./db/conn");
const recipeRouter = require("./routes/recipe");

const PORT = process.env.PORT || 5050;

// !::
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.use("/", recipeRouter);

app.listen(PORT, () => console.log(`Server is live on ${PORT} 🚀`));
