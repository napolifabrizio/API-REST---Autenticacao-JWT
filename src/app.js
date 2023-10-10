import express from "express";
import db from "./Config/dbConnect.js";
import routes from "./Routes/indexRoutes.js";

const app = express();

routes(app);

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Banco conectado!!");
});

export default app;