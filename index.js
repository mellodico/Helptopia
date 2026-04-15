const express = require('express');
const codigosData = require('./data/codigos');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { pagina: 'home' }); // 
});

app.get('/guia', (req, res) => {
  res.render('guia', { pagina: 'guia' });
});

app.get('/codigos', (req, res) => {
  // Enviamos 'pagina' para o menu e 'listaCodigos' para os cards
  res.render('codigos', { 
    pagina: 'codigos', 
    listaCodigos: codigosData 
  });
});

app.get('/mapa', (req, res) => {
  res.render('mapa', { pagina: 'mapa' });
});

app.get('/login', (req, res) => {
  res.render('login', { pagina: 'login' });
});

app.post('/login', (req, res) => {
  // TODO: Implementar autenticação
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('register', { pagina: 'register' });
});

app.post('/register', (req, res) => {
  // TODO: Implementar registro de usuário
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Rodando em http://localhost:3000');
});