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

app.get("/user/:id", checkToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({msg: "Usuário não encontrado"});
  }

  res.status(200).json({ user });

})

function checkToken(req, res, next) {
  const authHearder = req.headers["authorization"];
  const token = authHearder && authHearder.split(" ")[1];

  if (!token) {
    return res.status(401).json({msg: "Acesso negado!"});
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch(err) {
    res.status(400).json({msg: "Token inválido"});
  }
}

app.post("/auth/register", UsuarioController.cadastrarUsuario);

app.post("/auth/login", UsuarioController.loginUsuario);

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Banco conectado!!");
});

export default app;