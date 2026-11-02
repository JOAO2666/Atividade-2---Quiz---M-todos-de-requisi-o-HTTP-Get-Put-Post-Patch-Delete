# Planejamento Ágil (Scrum) — Projeto ExoApi Web API
**Unidade Curricular:** UC14 - Desenvolvimento de APIs  
**Instituição:** SENAI  
**Situação-Problema:** ExoApi — Sistema de Gestão de Projetos e Controle de Acessos  
**Duração Total:** 15 dias (conforme cronograma do guia didático)  
**Data de Início:** 02/11/2026 | **Data de Término:** 16/11/2026  

---

## 1. Visão Geral do Projeto

A **ExoApi** é uma empresa de desenvolvimento de software focada na integração de sistemas, performance, segurança e escalabilidade. Para suportar o lançamento do seu novo aplicativo mobile, a ExoApi necessita de uma **Web API RESTful** para centralizar, gerenciar e auditar os projetos desenvolvidos e as credenciais/permissões de usuários.

### Objetivos Principais
1. **CRUD Completo de Projetos:** Listar todos, buscar por ID, cadastrar, atualizar (total ou parcial) e remover projetos (`Id`, `NomeDoProjeto`, `Area`, `Status`).
2. **CRUD Completo de Usuários:** Listar todos, buscar por ID, cadastrar, atualizar e remover usuários (`Id`, `Email`, `Senha`).
3. **Segurança e Restrição de Acesso:** Autenticação via **JWT (JSON Web Token)**, política **CORS** para consumo pelo app mobile e proteção de rotas críticas (`PUT` e `DELETE` de projetos permitidos apenas para usuários autenticados).
4. **Padrões RESTful e Qualidade:** Formato JSON, respostas HTTP semânticas (`200`, `201`, `204`, `400`, `401`, `404`, `500`), tratamento global de exceções e documentação interativa via **Swagger/OpenAPI**.

---

## 2. Estrutura da Equipe e Papéis (Scrum)

- **Product Owner (PO):** Representante da ExoApi responsável pelo Backlog, priorização dos requisitos de negócio e validação dos critérios de aceitação.
- **Scrum Master:** Responsável por garantir as práticas ágeis, remoção de impedimentos e ritmo sustentável de entrega.
- **Development Team (Time Dev):** Desenvolvedores responsáveis pela arquitetura, codificação em C# / ASP.NET Core Web API, testes no Insomnia e documentação.

### Cerimônias Definidas
- **Sprint Planning:** Realizado no início de cada Sprint para selecionar itens do Product Backlog e estimar tarefas.
- **Daily Scrum:** Alinhamento diário rápido (15 min) para avaliar o que foi feito, o que será feito e bloqueios.
- **Sprint Review & Demo:** Apresentação dos endpoints funcionando e testados no Insomnia/Swagger para o PO.
- **Sprint Retrospective:** Análise de pontos de melhoria técnica e processual para a próxima Sprint.

---

## 3. As 5 Etapas Obrigatórias e o Cronograma de Prazos (15 Dias)

Alinhado rigorosamente à orientação de estudos da situação-problema (15 dias de duração), o projeto foi estruturado em **3 Sprints incrementais**:

| Etapa Obrigatória | Tarefas no Scrum / Trello | Duração | Prazo Limite | Status |
| :--- | :--- | :---: | :---: | :---: |
| **0. Planejamento Scrum** | Configuração do quadro Trello, escrita das User Stories e definição de DoD | 2 dias | **02/11 a 03/11** | Concluído |
| **1. Preparação do ambiente** | Instalação de SDKs, IDE (VS/VS Code), SQL Server, Insomnia e revisão HTTP | 2 dias | **04/11 a 05/11** | Concluído |
| **2. Criação do projeto** | Setup da Web API, Entity Framework Core, DbContext, Models e Migrations | 2 dias | **06/11 a 07/11** | Concluído |
| **3. Métodos GET, POST, PUT, DELETE** | Implementação dos Repositórios e Controllers de Projetos e de Usuários | 5 dias | **08/11 a 12/11** | Concluído |
| **4. Retorno de erros e Status HTTP** | Padronização de códigos HTTP, validação de payload e tratamento com try/catch | 2 dias | **13/11 a 14/11** | Concluído |
| **5. Recursos de segurança** | Implementação de autenticação JWT, endpoint `/api/login`, CORS e `[Authorize]` | 2 dias | **15/11 a 16/11** | Concluído |
| **TOTAL** | **Entrega completa da API ExoApi** | **15 dias** | **16/11/2026** | **100%** |

---

## 4. Divisão das Sprints

### Sprint 1: Fundação, Ambiente e Arquitetura Base (Dias 1 a 4 | 02/11 a 05/11)
- **Meta da Sprint:** Deixar o ambiente 100% operacional, modelagem de dados definida e planejamento documentado.
- **Itens do Backlog:**
  - [x] Configuração do Quadro Kanban/Scrum no Trello com estimativas e critérios.
  - [x] **Etapa 1:** Preparação do ambiente de desenvolvimento (.NET SDK 8, SQL Server LocalDB, Insomnia, VS Code).
  - [x] Testes prévios de conexão e ambiente.

### Sprint 2: Criação do Projeto e Endpoints CRUD (Dias 5 a 11 | 06/11 a 12/11)
- **Meta da Sprint:** Criar a base da aplicação e disponibilizar todos os métodos CRUD para Projetos e Usuários.
- **Itens do Backlog:**
  - [x] **Etapa 2:** Criação da solução `Exo.WebApi`, instalação dos pacotes NuGet (EF Core, SqlServer, Tools, Swagger).
  - [x] Criação do `ExoContext` e configuração da Connection String.
  - [x] Model `Projeto` (`Id`, `NomeDoProjeto`, `Area`, `Status`) e `ProjetoRepository`.
  - [x] **Etapa 3:** Controller `ProjetosController` com métodos `GET`, `GET/{id}`, `POST`, `PUT`, `DELETE`.
  - [x] Model `Usuario` (`Id`, `Email`, `Senha`), `UsuarioRepository` e `UsuariosController` completo.
  - [x] Teste de requisições no navegador e Insomnia.

### Sprint 3: Tratamento de Erros, Segurança JWT e Documentação (Dias 12 a 15 | 13/11 a 16/11)
- **Meta da Sprint:** Blindar a API com segurança, padronizar códigos de erro e entregar a documentação final.
- **Itens do Backlog:**
  - [x] **Etapa 4:** Configuração de mensagens de retorno de erros e Status Codes RESTful (`200`, `201`, `204`, `400`, `401`, `404`, `500`).
  - [x] **Etapa 5:** Implementação de Autenticação e Autorização com **JWT (JSON Web Token)**.
  - [x] Criação da rota `POST /api/login` para emissão do Token de acesso.
  - [x] Bloqueio de rotas: aplicar atributo `[Authorize]` nos métodos `PUT` e `DELETE` de Projetos.
  - [x] Configuração de políticas de **CORS** para viabilizar integração com a aplicação Mobile.
  - [x] Validação final via Swagger UI e exportação das evidências da Atividade 1.

---

## 5. Estrutura do Quadro Trello (Scrum Board)

Para o acompanhamento visual das tarefas, o quadro foi estruturado nas seguintes listas:

1. **Product Backlog:** Todas as histórias de usuário e requisitos levantados para a ExoApi.
2. **Sprint Backlog (A Fazer / To Do):** Tarefas priorizadas para a sprint atual com datas de entrega definidas.
3. **Em Andamento (Doing):** Atividades em execução no momento pelo time de desenvolvimento.
4. **Em Teste / Code Review (QA):** Endpoints sendo testados no Insomnia, validação de payload e revisão de código.
5. **Concluído (Done):** Tarefas finalizadas que atendem plenamente à *Definition of Done (DoD)*.

### Critérios de Conclusão (Definition of Done - DoD)
- Código fonte devidamente versionado e sem warnings críticos.
- Endpoint testado com sucesso no Insomnia e validado no Swagger.
- Status Code HTTP correspondente ao padrão RESTful retornado.
- Proteção de segurança aplicada e validada (ex: rota protegida retorna `401 Unauthorized` quando sem token).
- Documentação atualizada.

