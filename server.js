const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'exoapi-chave-super-secreta-autenticacao-jwt-senai-2026';

// Middlewares
app.use(cors());
app.use(express.json());

// Base de Dados em Memória (Seeds iniciais)
let projetos = [
  { id: 1, nomeDoProjeto: 'App Mobile ExoGestão', area: 'Mobile / React Native', status: true },
  { id: 2, nomeDoProjeto: 'Portal de Integração ERP', area: 'Backend / Web API', status: true },
  { id: 3, nomeDoProjeto: 'Módulo de Auditoria e Logs', area: 'Segurança da Informação', status: false }
];

let usuarios = [
  { id: 1, email: 'admin@exoapi.com', senha: '123456' },
  { id: 2, email: 'dev@exoapi.com', senha: 'senhasegura2026' }
];

let nextProjetoId = 4;
let nextUsuarioId = 3;

// Middleware de Autenticação JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
    req.usuario = usuario;
    next();
  });
}

// ==========================================
// 1. ROTA DE AUTENTICAÇÃO (LOGIN)
// ==========================================
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
  }

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
  }

  const payload = {
    id: usuario.id,
    email: usuario.email,
    role: 'Admin'
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

  return res.status(200).json({
    mensagem: 'Autenticação realizada com sucesso!',
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email
    }
  });
});

// ==========================================
// 2. ROTAS DE PROJETOS (CRUD)
// ==========================================

// GET /api/projetos - Listar todos os projetos
app.get('/api/projetos', (req, res) => {
  return res.status(200).json(projetos);
});

// GET /api/projetos/:id - Buscar projeto por ID
app.get('/api/projetos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projeto = projetos.find(p => p.id === id);

  if (!projeto) {
    return res.status(404).json({ mensagem: `Projeto com ID ${id} não foi encontrado.` });
  }

  return res.status(200).json(projeto);
});

// POST /api/projetos - Cadastrar novo projeto
app.post('/api/projetos', (req, res) => {
  const { nomeDoProjeto, area, status } = req.body;

  if (!nomeDoProjeto || !area) {
    return res.status(400).json({ mensagem: 'Nome do projeto e área são obrigatórios.' });
  }

  const novoProjeto = {
    id: nextProjetoId++,
    nomeDoProjeto,
    area,
    status: status !== undefined ? Boolean(status) : true
  };

  projetos.push(novoProjeto);
  return res.status(201).json(novoProjeto);
});

// PUT /api/projetos/:id - Atualizar projeto completo (Acesso Restrito via JWT)
app.put('/api/projetos/:id', autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = projetos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Projeto com ID ${id} não foi encontrado.` });
  }

  const { nomeDoProjeto, area, status } = req.body;

  projetos[index] = {
    id,
    nomeDoProjeto: nomeDoProjeto || projetos[index].nomeDoProjeto,
    area: area || projetos[index].area,
    status: status !== undefined ? Boolean(status) : projetos[index].status
  };

  return res.status(204).send();
});

// PATCH /api/projetos/:id - Atualização parcial (Acesso Restrito via JWT)
app.patch('/api/projetos/:id', autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);
  const projeto = projetos.find(p => p.id === id);

  if (!projeto) {
    return res.status(404).json({ mensagem: `Projeto com ID ${id} não foi encontrado.` });
  }

  if (req.body.nomeDoProjeto !== undefined) projeto.nomeDoProjeto = req.body.nomeDoProjeto;
  if (req.body.area !== undefined) projeto.area = req.body.area;
  if (req.body.status !== undefined) projeto.status = Boolean(req.body.status);

  return res.status(200).json(projeto);
});

// DELETE /api/projetos/:id - Deletar projeto (Acesso Restrito via JWT)
app.delete('/api/projetos/:id', autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = projetos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Projeto com ID ${id} não foi encontrado.` });
  }

  projetos.splice(index, 1);
  return res.status(204).send();
});

// ==========================================
// 3. ROTAS DE USUÁRIOS (CRUD)
// ==========================================

// GET /api/usuarios - Listar todos os usuários
app.get('/api/usuarios', (req, res) => {
  return res.status(200).json(usuarios);
});

// GET /api/usuarios/:id - Buscar usuário por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: `Usuário com ID ${id} não encontrado.` });
  }

  return res.status(200).json(usuario);
});

// POST /api/usuarios - Cadastrar novo usuário
app.post('/api/usuarios', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
  }

  if (usuarios.some(u => u.email === email)) {
    return res.status(400).json({ mensagem: 'Este e-mail já está cadastrado.' });
  }

  const novoUsuario = {
    id: nextUsuarioId++,
    email,
    senha
  };

  usuarios.push(novoUsuario);
  return res.status(201).json(novoUsuario);
});

// PUT /api/usuarios/:id - Atualizar usuário
app.put('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Usuário com ID ${id} não encontrado.` });
  }

  const { email, senha } = req.body;

  usuarios[index] = {
    id,
    email: email || usuarios[index].email,
    senha: senha || usuarios[index].senha
  };

  return res.status(204).send();
});

// DELETE /api/usuarios/:id - Deletar usuário
app.delete('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Usuário com ID ${id} não encontrado.` });
  }

  usuarios.splice(index, 1);
  return res.status(204).send();
});

// Rota raiz para conferência no navegador
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>ExoApi - SENAI UC14</title></head>
      <body style="font-family: Arial, sans-serif; padding: 40px; background: #f0f2f5;">
        <h1 style="color: #026aa7;">ExoApi - Web API Online</h1>
        <p>API RESTful desenvolvida para a Situação-Problema da ExoApi (SENAI UC14).</p>
        <ul>
          <li><strong>Projetos:</strong> <a href="/api/projetos">/api/projetos</a></li>
          <li><strong>Usuários:</strong> <a href="/api/usuarios">/api/usuarios</a></li>
          <li><strong>Autenticação:</strong> POST para <code>/api/login</code></li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` ExoApi Web API rodando com sucesso em http://localhost:${PORT}`);
  console.log(` Swagger/Endpoints disponíveis:`);
  console.log(` -> GET  /api/projetos`);
  console.log(` -> POST /api/login`);
  console.log(` -> GET  /api/usuarios`);
  console.log(`====================================================`);
});

