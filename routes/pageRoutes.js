const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.render("home", { pagina: "home" });
});

router.get("/login", (req, res) => {
  res.render("login", { pagina: "login" });
});

router.get("/register", (req, res) => {
  res.render("register", { pagina: "register" });
});

router.get("/guia", (req, res) => {
  res.render("guia", { pagina: "guia" });
});

router.get("/mapa", (req, res) => {
  res.render("mapa", { pagina: "mapa" });
});

router.get("/codigos", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM codigos ORDER BY status ASC, expira ASC"
    );
    res.render("codigos", { listaCodigos: result.rows });
  } catch (err) {
    console.error(err);
    res.render("codigos", { listaCodigos: [] });
  }
});

module.exports = router;