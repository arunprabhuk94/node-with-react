import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
