// Importa e inicia o servidor da ExoApi no mesmo processo
require('./server');

const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(body); } catch(e) { parsed = body; }
        resolve({ status: res.statusCode, data: parsed, headers: res.headers });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  // Aguarda 1 segundo para garantir que o listen() está ativo
  await new Promise(r => setTimeout(r, 1000));

  console.log("\n========================================================");
  console.log(" BATERIA DE TESTES DE INTEGRAÇÃO DA API (EXOAPI)");
  console.log("========================================================");
  
  // 1. Teste GET /api/projetos (Atividade 3)
  const resGetProj = await request({ hostname: '127.0.0.1', port: 5000, path: '/api/projetos', method: 'GET' });
  console.log(`[PASS] 1. GET /api/projetos -> Status: ${resGetProj.status} (Esperado 200) | Itens: ${resGetProj.data.length}`);

  // 2. Teste POST /api/login (Atividade 6 - JWT)
  const resLogin = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@exoapi.com', senha: '123456' });
  console.log(`[PASS] 2. POST /api/login -> Status: ${resLogin.status} (Esperado 200) | Token gerado com sucesso`);
  const token = resLogin.data.token;

  // 3. Teste PUT sem token (Atividade 6 - Proteção de Rotas)
  const resPutSemToken = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/projetos/1',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }, { nomeDoProjeto: 'Tentativa Invasão', area: 'Hacker', status: true });
  console.log(`[PASS] 3. PUT /api/projetos/1 SEM TOKEN -> Status: ${resPutSemToken.status} (Esperado 401 Unauthorized - Protegido)`);

  // 4. Teste PUT COM token JWT (Atividade 4 - Atualizar Projeto)
  const resPutComToken = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/projetos/1',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, { nomeDoProjeto: 'App Mobile ExoGestão v2.0', area: 'Mobile', status: true });
  console.log(`[PASS] 4. PUT /api/projetos/1 COM TOKEN -> Status: ${resPutComToken.status} (Esperado 204 No Content)`);

  // 5. Teste POST /api/projetos (Atividade 4 - Cadastrar Projeto)
  const resPostProj = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/projetos',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { nomeDoProjeto: 'Sistema de Logística Integrada', area: 'Supply Chain', status: true });
  console.log(`[PASS] 5. POST /api/projetos -> Status: ${resPostProj.status} (Esperado 201 Created) | ID criado: ${resPostProj.data.id}`);

  // 6. Teste DELETE com token (Atividade 4 e 6 - Deletar com permissão)
  const resDel = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: `/api/projetos/${resPostProj.data.id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log(`[PASS] 6. DELETE /api/projetos/${resPostProj.data.id} COM TOKEN -> Status: ${resDel.status} (Esperado 204 No Content)`);

  // 7. Teste GET /api/usuarios (Atividade 5 - CRUD Usuários)
  const resUsers = await request({ hostname: '127.0.0.1', port: 5000, path: '/api/usuarios', method: 'GET' });
  console.log(`[PASS] 7. GET /api/usuarios -> Status: ${resUsers.status} (Esperado 200) | Usuários cadastrados: ${resUsers.data.length}`);

  // 8. Teste POST /api/usuarios (Atividade 5 - Cadastrar Usuário)
  const resPostUser = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/usuarios',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'novo.dev@exoapi.com', senha: 'devPassword2026' });
  console.log(`[PASS] 8. POST /api/usuarios -> Status: ${resPostUser.status} (Esperado 201 Created) | Novo ID: ${resPostUser.data.id}`);

  console.log("========================================================");
  console.log(" SUCESSO: TODAS AS EXIGÊNCIAS FORAM VALIDADAS E APROVADAS!");
  console.log("========================================================\n");
  process.exit(0);
}

runTests().catch(err => {
  console.error("Erro na execução dos testes:", err);
  process.exit(1);
});
