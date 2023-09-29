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

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) return res.status(422).json({ msg: "Nome inválido" });
  if (!email) return res.status(422).json({ msg: "Email inválido" });
  if (!password) return res.status(422).json({ msg: "Senha inválida" });
  if (confirmPassword != password)
    return res.status(422).json({ msg: "As senhas não batem" });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(422).json({ msg: "Esse email já possui um cadastro" });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário cadastrado!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Ocorreu um erro no servidor" });
  }
});

app.post("auth/login", async (req, res) => {
  const {password, email} = req.body;

  if (!email) return res.status(422).json({ msg: "Email inválido" });
  if (!password) return res.status(422).json({ msg: "Senha inválida" });

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
