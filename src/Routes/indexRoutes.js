import express from "express";
import UserRouter from "./userRoutes.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API REST");
  });

  app.use(
    express.json(), 
    UserRouter
    );
};

export default routes;
