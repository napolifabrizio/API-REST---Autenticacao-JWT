import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import db from "./Config/dbConnect.js";
import UsuarioController from "./Controllers/ControllerUsuario.js";

import dotenv from 'dotenv';
dotenv.config();

import User from "./Models/User.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});

app.get("/user/:id", UsuarioController.checkToken, UsuarioController.idUsuario);

app.post("/auth/register", UsuarioController.cadastrarUsuario);

app.post("/auth/login", UsuarioController.loginUsuario);

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Banco conectado!!");
});

export default app;