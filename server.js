const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const novoUsuario = { nome, email, senha };

  let usuarios = [];
  if (fs.existsSync('usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('usuarios.json'));
  }

  usuarios.push(novoUsuario);
  fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));

  res.send('Usuário cadastrado com sucesso!');
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));


app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (!fs.existsSync('usuarios.json')) {
    return res.status(400).send('Nenhum usuário cadastrado!');
  }

  const usuarios = JSON.parse(fs.readFileSync('usuarios.json'));

  const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuarioEncontrado) {
    res.send({ mensagem: 'Login bem-sucedido!', nome: usuarioEncontrado.nome });
  } else {
    res.status(401).send('Email ou senha incorretos!');
  }
});
