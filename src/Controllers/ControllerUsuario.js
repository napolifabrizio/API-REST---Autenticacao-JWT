import User from "../Models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



class UsuarioController {
    static cadastrarUsuario = async (req, res) => {
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
    }

    static loginUsuario = async (req, res) => {
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
    }
}

export default UsuarioController;