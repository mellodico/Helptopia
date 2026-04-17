const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {
  criarUsuario,
  buscarPorNome,
} = require("../models/usuarioModel");

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await buscarPorNome(username);

    if (!usuario) {
      return res.send("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return res.send("Senha incorreta");
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Erro no login");
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.send("Preencha todos os campos");
    }

    if (password !== confirmPassword) {
      return res.send("As senhas não coincidem");
    }

    const senhaHash = await bcrypt.hash(password, 10);

    await criarUsuario(username, email, senhaHash);

    res.redirect("/login");
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.send("Email já cadastrado");
    }

    res.send("Erro ao cadastrar usuário");
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;