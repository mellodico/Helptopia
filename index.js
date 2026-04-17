const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

app.use(
  session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// rotas
app.use(authRoutes);
app.use(pageRoutes);

app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});