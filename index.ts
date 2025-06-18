import express from "express";
import { initializePassport } from "./services";
import { authRoutes } from "./routes";

initializePassport();

const app = express();
authRoutes(app);

const port = 3000;
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
