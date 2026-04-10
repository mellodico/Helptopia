const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { pagina: 'home' }); // 
});

app.get('/guia', (req, res) => {
  res.render('guia', { pagina: 'guia' });
});

app.get('/mapa', (req, res) => {
  res.render('mapa', { pagina: 'mapa' });
});

app.listen(3000, () => {
  console.log('Rodando em http://localhost:3000');
});