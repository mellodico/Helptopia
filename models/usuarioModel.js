const pool = require('../db');

// criar usuário
async function criarUsuario(nome, email, senhaHash) {
  const result = await pool.query(
    `INSERT INTO usuarios (nome, email, senha)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email`,
    [nome, email, senhaHash]
  );

  return result.rows[0];
}

async function buscarPorEmail(email) {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  return result.rows[0];
}


// buscar por nome (login)
async function buscarPorNome(nome) {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE nome = $1",
    [nome]
  );

  return result.rows[0];
}

module.exports = {
  criarUsuario,
  buscarPorNome,
  buscarPorEmail
};