require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const User = require("./models/User");

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});

app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    if (!name) return res.status(422).json({msg: 'Nome inválido'});
    if (!email) return res.status(422).json({msg: 'Email inválido'});
    if (!password) return res.status(422).json({msg: 'Senha inválida'});
    if (confirmPassword != password) return res.status(422).json({msg: 'As senhas não batem'});
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPass}@cluester0.hde5qpu.mongodb.net/`)
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco");
  })
  .catch((err) => console.log(err));
