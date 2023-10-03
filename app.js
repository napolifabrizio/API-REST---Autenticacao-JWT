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

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "Nome inválido" });
  }
  if (!email) {
    return res.status(422).json({ msg: "Email inválido" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha inválida" });
  }
  if (confirmPassword != password) {
    return res.status(422).json({ msg: "As senhas não batem" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: "Esse email já possui um cadastro" });
  }

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

app.post("/auth/login", async (req, res) => {
  const { password, email } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "Email inválido" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(201).json({ msg: "Autenticação feita com sucesso", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Ocorreu um erro no servidor" });
  }
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPass}@cluester0.hde5qpu.mongodb.net/`)
  .then(() => {
    app.listen(3000);
    console.log("Deu certooo, conectou ao bancoooo caracaaa!!");
  })
  .catch((err) => console.log(err));
