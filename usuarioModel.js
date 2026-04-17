const pool = require('./db');

async function criarUsuario(nome, email, senhaHash) {
  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email, criado_em;
  `;

  const values = [nome, email, senhaHash];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = { criarUsuario };