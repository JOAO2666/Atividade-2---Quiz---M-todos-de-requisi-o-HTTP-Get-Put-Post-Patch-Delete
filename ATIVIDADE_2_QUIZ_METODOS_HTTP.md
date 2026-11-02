# SP1 - Atividade 2: Quiz — Métodos de Requisição HTTP
**Unidade Curricular:** UC14 - Desenvolvimento de APIs  
**Instituição:** SENAI  
**Tema:** Métodos HTTP (GET, POST, PUT, PATCH, DELETE), Status Codes e RESTful Standards  
**Peso na Avaliação:** 25% | **Duração Prevista:** 2 dias  

---

## 1. Guia Conceitual Completo dos Métodos HTTP

No desenvolvimento de Web APIs RESTful, os métodos de requisição HTTP (verbos HTTP) indicam ao servidor qual ação deve ser executada sobre um determinado recurso identificado por uma URI.

### 1.1. O Método GET
- **Finalidade:** Recuperar/consultar representações de recursos do servidor.
- **Seguro (Safe):** **Sim.** Não deve provocar efeitos colaterais nem alterar o estado do servidor.
- **Idempotente:** **Sim.** Executar 1 ou 100 requisições GET idênticas produzirá o mesmo efeito no sistema.
- **Corpo (Payload/Body):** Não deve possuir corpo. Os parâmetros devem ser passados via **Route Params** (`/api/projetos/1`) ou **Query Strings** (`/api/projetos?area=Mobile`).
- **Respostas Típicas:** `200 OK` (com os dados em JSON) ou `404 Not Found` (caso o recurso não exista).

### 1.2. O Método POST
- **Finalidade:** Submeter dados para criação de um novo recurso subordinado ou disparar um processamento no servidor (ex: Login/Autenticação).
- **Seguro (Safe):** **Não.** Altera o estado do servidor inserindo novos registros.
- **Idempotente:** **Não.** Submeter a mesma requisição POST várias vezes resultará na criação de múltiplos recursos duplicados.
- **Corpo (Payload/Body):** Obrigatório na maioria dos casos (enviado em formato JSON).
- **Respostas Típicas:** `201 Created` (com os dados do objeto criado e idealmente o cabeçalho `Location`) ou `400 Bad Request` (caso os dados enviados sejam inválidos).

### 1.3. O Método PUT
- **Finalidade:** Atualizar ou substituir **integralmente** um recurso existente identificado pela URI.
- **Seguro (Safe):** **Não.** Modifica dados existentes.
- **Idempotente:** **Sim.** Se você enviar a mesma atualização completa repetidas vezes, o estado final do recurso no servidor permanecerá idêntico.
- **Atenção:** Em um `PUT`, todos os campos do recurso devem ser fornecidos. Campos omitidos no corpo da requisição correm o risco de serem sobrescritos por valores nulos ou padrão.
- **Respostas Típicas:** `200 OK` (com o objeto atualizado), `204 No Content` (sem corpo de resposta) ou `404 Not Found` (se o ID não existir).

### 1.4. O Método PATCH
- **Finalidade:** Aplicar modificações **parciais** em um recurso existente (ex: alterar apenas o campo `Status` de um Projeto de `false` para `true`).
- **Seguro (Safe):** **Não.**
- **Idempotente:** Nem sempre. Se a alteração for relativa (ex: incrementar saldo), não é idempotente; se for absoluta (definir status = true), comporta-se de forma idempotente.
- **Respostas Típicas:** `200 OK` ou `204 No Content`.

### 1.5. O Método DELETE
- **Finalidade:** Remover permanentemente o recurso especificado pelo identificador na URI.
- **Seguro (Safe):** **Não.** Remove dados do banco.
- **Idempotente:** **Sim.** A primeira requisição remove o recurso; requisições subsequentes não alteram o estado final (o recurso já não existe).
- **Respostas Típicas:** `204 No Content` (padrão recomendado), `200 OK` ou `404 Not Found`.

---

## 2. Matriz Comparativa Oficial

| Método | Finalidade | Seguro? | Idempotente? | Suporta Body? | Status Code de Sucesso |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **GET** | Consultar recursos | **SIM** | **SIM** | NÃO | `200 OK` |
| **POST** | Criar recurso / Processar | **NÃO** | **NÃO** | **SIM** | `201 Created` |
| **PUT** | Atualização completa | **NÃO** | **SIM** | **SIM** | `200 OK` ou `204 No Content` |
| **PATCH** | Atualização parcial | **NÃO** | Varia | **SIM** | `200 OK` ou `204 No Content` |
| **DELETE** | Excluir recurso | **NÃO** | **SIM** | NÃO | `204 No Content` |

---

## 3. Simulado Oficial do Quiz do SENAI com Gabarito Comentado

### Questão 1
**Enunciado:** Qual método HTTP deve ser utilizado quando uma aplicação mobile precisa listar todos os projetos da empresa sem causar nenhuma alteração no banco de dados?  
- A) POST  
- B) GET  
- C) PUT  
- D) PATCH  
> **Resposta Correta: B (GET)**  
> *Comentário:* O método GET é categorizado como seguro e idempotente, sendo a escolha mandatória para consultas e leituras de dados.

---

### Questão 2
**Enunciado:** Ao cadastrar com sucesso um novo projeto na ExoApi através de uma requisição `POST /api/projetos`, qual o código de status HTTP recomendado pelas boas práticas RESTful que deve ser retornado pelo servidor?  
- A) 200 OK  
- B) 201 Created  
- C) 204 No Content  
- D) 202 Accepted  
> **Resposta Correta: B (201 Created)**  
> *Comentário:* De acordo com a RFC 9110 (HTTP Semantics), quando um novo recurso é criado com sucesso a partir de um método POST, o status de retorno ideal é o `201 Created`.

---

### Questão 3
**Enunciado:** Qual a diferença fundamental entre os métodos `PUT` e `PATCH` ao atualizar os dados de um usuário ou projeto?  
- A) O método PUT é utilizado apenas para deletar recursos, enquanto PATCH é para criar.  
- B) O método PUT realiza uma substituição completa do recurso, enquanto o PATCH permite alterar apenas campos específicos de forma parcial.  
- C) O PATCH não aceita corpo de requisição (JSON), enquanto o PUT aceita.  
- D) O método PUT não é idempotente, enquanto o PATCH é sempre seguro.  
> **Resposta Correta: B**  
> *Comentário:* O `PUT` envia a representação completa do recurso para substituição integral. O `PATCH` envia um conjunto de instruções ou apenas as propriedades que devem ser alteradas.

---

### Questão 4
**Enunciado:** Quando uma requisição `DELETE /api/projetos/5` é executada com sucesso e remove o registro do banco de dados sem retornar nenhum conteúdo no corpo da resposta, qual o código HTTP adequado?  
- A) 204 No Content  
- B) 200 OK  
- C) 404 Not Found  
- D) 301 Moved Permanently  
> **Resposta Correta: A (204 No Content)**  
> *Comentário:* O código `204 No Content` indica que o servidor processou a requisição com total sucesso, mas não há nenhuma entidade a ser devolvida no payload da resposta.

---

### Questão 5
**Enunciado:** O conceito de **Idempotência** em serviços web REST significa que:  
- A) A requisição só pode ser chamada uma única vez na vida útil da aplicação.  
- B) Múltiplas requisições idênticas produzem o mesmo resultado no estado do servidor que uma única requisição.  
- C) O servidor sempre retorna um erro caso a requisição seja repetida.  
- D) A resposta da requisição é obrigatoriamente criptografada.  
> **Resposta Correta: B**  
> *Comentário:* Métodos idempotentes (GET, PUT, DELETE, HEAD) garantem que execuções sucessivas e repetidas com os mesmos parâmetros resultam no mesmo estado no servidor. O POST NÃO é idempotente, pois gera novos registros a cada envio.

---

### Questão 6
**Enunciado:** Em uma API protegida por autenticação JWT como a da ExoApi, caso um usuário tente executar `DELETE /api/projetos/1` sem informar o token no cabeçalho `Authorization: Bearer {token}`, o servidor deve rejeitar a requisição com qual código de status?  
- A) 400 Bad Request  
- B) 401 Unauthorized  
- C) 403 Forbidden  
- D) 404 Not Found  
> **Resposta Correta: B (401 Unauthorized)**  
> *Comentário:* O código `401 Unauthorized` é retornado quando faltam credenciais de autenticação válidas para acessar a rota protegida. (Se o token fosse válido, mas o usuário não tivesse a role necessária, o retorno seria `403 Forbidden`).

---

### Questão 7
**Enunciado:** Ao tentar buscar um projeto inexistente com `GET /api/projetos/999`, qual é a resposta semântica correta que a API deve fornecer à aplicação cliente?  
- A) 500 Internal Server Error  
- B) 204 No Content  
- C) 404 Not Found  
- D) 400 Bad Request  
> **Resposta Correta: C (404 Not Found)**  
> *Comentário:* O status `404 Not Found` comunica ao cliente que a URI informada aponta para um recurso que não existe atualmente no servidor. Não deve ser tratado como erro 500.

---

### Questão 8
**Enunciado:** Qual formato padrão de representação de dados é exigido pelo mercado e pelas diretrizes da ExoApi para intercâmbio de mensagens entre a API e o aplicativo Mobile?  
- A) XML  
- B) JSON (JavaScript Object Notation)  
- C) YAML  
- D) CSV  
> **Resposta Correta: B (JSON)**  
> *Comentário:* O formato JSON é leve, de fácil leitura tanto para humanos quanto para máquinas, e é o padrão universal adotado em APIs RESTful modernas e no consumo por plataformas mobile (Android/iOS).

