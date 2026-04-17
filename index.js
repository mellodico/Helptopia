require("dotenv").config();
const db = require("./db");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");

app.use(
  session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

app.use(express.urlencoded({ extended: true })); // pegar dados do form
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { pagina: "home" }); //
});

app.get("/guia", (req, res) => {
  res.render("guia", { pagina: "guia" });
});

app.get("/codigos", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM codigos ORDER BY status ASC, expira ASC",
    );
    res.render("codigos", { listaCodigos: result.rows });
  } catch (err) {
    console.error("Erro ao buscar códigos:", err);
    res.render("codigos", { listaCodigos: [] });
  }
});

app.get("/mapa", (req, res) => {
  res.render("mapa", { pagina: "mapa" });
});

app.get("/login", (req, res) => {
  res.render("login", { pagina: "login" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // buscar usuário pelo nome (não pelo email)
    const result = await db.query("SELECT * FROM usuarios WHERE nome = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.send("Usuário não encontrado");
    }

    const usuario = result.rows[0];

    // 🔒 comparar senha com bcrypt
    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return res.send("Senha incorreta");
    }

    // login OK
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

app.get("/register", (req, res) => {
  res.render("register", { pagina: "register" });
});

app.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // validação básica
    if (!username || !email || !password || !confirmPassword) {
      return res.send("Preencha todos os campos");
    }

    if (password !== confirmPassword) {
      return res.send("As senhas não coincidem");
    }

    // 🔒 hash da senha usando :contentReference[oaicite:0]{index=0}
    const senhaHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES ($1, $2, $3)`,
      [username, email, senhaHash],
    );

    res.redirect("/login");
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.send("Email já cadastrado");
    }

    res.send("Erro ao cadastrar usuário");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});
