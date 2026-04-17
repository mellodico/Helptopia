require("dotenv").config();
const db = require("./db");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { pagina: "home" }); //
});

app.get("/guia", (req, res) => {
  res.render("guia", { pagina: "guia" });
});

app.get('/codigos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM codigos ORDER BY status ASC, expira ASC');
    res.render('codigos', { listaCodigos: result.rows });
  } catch (err) {
    console.error('Erro ao buscar códigos:', err);
    res.render('codigos', { listaCodigos: [] });
  }
});

app.get("/mapa", (req, res) => {
  res.render("mapa", { pagina: "mapa" });
});

app.get("/login", (req, res) => {
  res.render("login", { pagina: "login" });
});

app.post("/login", (req, res) => {
  // TODO: Implementar autenticação
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register", { pagina: "register" });
});

app.post("/register", (req, res) => {
  // TODO: Implementar registro de usuário
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});
