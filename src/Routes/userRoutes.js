import express from "express";
import UsuarioController from "../Controllers/ControllerUsuario.js";

const router = express.Router();

router
    .post("/auth/register", UsuarioController.cadastrarUsuario)
    .post("/auth/login", UsuarioController.loginUsuario)
    .get("/user/:id", UsuarioController.checkToken, UsuarioController.idUsuario);

export default router;