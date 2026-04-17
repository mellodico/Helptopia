const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { criarUsuario } = require('./usuarioModel');

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // 🔒 criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await criarUsuario(nome, email, senhaHash);

    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);

    // erro de email duplicado
    if (err.code === '23505') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;