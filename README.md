# UC14 - Desenvolvimento de APIs (SENAI) • Projeto ExoApi

Repositório destinado às atividades práticas e teóricas da Unidade Curricular **UC14 - Desenvolvimento de APIs**, com foco na metodologia ágil **Scrum** e nos conceitos fundamentais de requisições **HTTP (GET, POST, PUT, PATCH, DELETE)** para a empresa **ExoApi**.

---

## 📌 Atividade 1: Planejamento Ágil com Scrum (Trello)

### Cenário da ExoApi
A **ExoApi** é uma empresa de desenvolvimento focada em integração de sistemas, performance e escalabilidade. O projeto consiste em desenvolver a Web API RESTful para um aplicativo mobile que gerencia todos os projetos da empresa e controla o acesso de usuários com autenticação segura.

### Quadro Scrum no Trello (15 Dias de Cronograma)
Abaixo está a representação visual do quadro Scrum planejado para as entregas incrementais da API, com todas as **5 etapas obrigatórias** e seus respectivos prazos delimitados:

![Quadro Scrum Trello - ExoApi](quadro_trello_exoapi.png)

### As 5 Etapas Obrigatórias e Cronograma

| Etapa | Tarefas Planejadas | Duração | Prazo Delimitado | Status |
| :---: | :--- | :---: | :---: | :---: |
| **Etapa 0** | **Planejamento Scrum:** Criação do Backlog, definição de Sprints e critérios de aceitação no Trello | 2 dias | 02/11 a 03/11 | Concluído |
| **Etapa 1** | **Preparação do ambiente:** Instalação do SDK (.NET / Node), IDE (VS Code / Visual Studio), SQL Server e Insomnia | 2 dias | 04/11 a 05/11 | Concluído |
| **Etapa 2** | **Criação do projeto:** Inicialização da Web API, Entity Framework Core, DbContext, Models e Migrations | 2 dias | 06/11 a 07/11 | Concluído |
| **Etapa 3** | **Métodos GET, POST, PUT e DELETE:** Desenvolvimento dos endpoints CRUD de Projetos e de Usuários com retorno JSON | 5 dias | 08/11 a 12/11 | Em Andamento |
| **Etapa 4** | **Retorno de erros e Status Codes:** Padronização RESTful (200, 201, 204, 400, 401, 404, 500) e try/catch global | 2 dias | 13/11 a 14/11 | A Fazer |
| **Etapa 5** | **Recursos de segurança:** Autenticação JWT, endpoint `/api/login`, configuração CORS e restrição `[Authorize]` | 2 dias | 15/11 a 16/11 | A Fazer |

> 📄 Detalhamento completo das User Stories, papéis e cerimônias em: [`PLANEJAMENTO_SCRUM_EXOAPI.md`](PLANEJAMENTO_SCRUM_EXOAPI.md).

---

## 📚 Atividade 2: Guia de Métodos de Requisição HTTP (Guia de Estudos & Quiz)

Resumo conceitual sobre os principais verbos HTTP utilizados no desenvolvimento de APIs RESTful:

| Método HTTP | Finalidade Principal | Idempotente? | Seguro? | Corpo (Body)? | Exemplo de Status Code |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **GET** | Consultar/recuperar informações de um recurso sem alterar seu estado. | Sim | Sim | Não | `200 OK`, `404 Not Found` |
| **POST** | Criar um novo recurso no servidor ou processar dados enviados. | Não | Não | Sim | `201 Created`, `400 Bad Request` |
| **PUT** | Atualizar/substituir integralmente um recurso existente pelo ID informado. | Sim | Não | Sim | `200 OK`, `204 No Content` |
| **PATCH** | Atualizar parcialmente campos específicos de um recurso existente. | Não | Não | Sim | `200 OK`, `204 No Content` |
| **DELETE** | Remover permanentemente um recurso específico do servidor. | Sim | Não | Não | `200 OK`, `204 No Content` |

### Códigos de Status HTTP Mais Utilizados
- **200 OK:** Requisição bem-sucedida com retorno de dados.
- **201 Created:** Novo recurso criado com sucesso no servidor.
- **204 No Content:** Ação realizada com sucesso, sem corpo de retorno (comum em DELETE e PUT).
- **400 Bad Request:** Dados da requisição inválidos ou mal formatados.
- **401 Unauthorized:** Usuário não autenticado (falta token JWT ou token expirado).
- **403 Forbidden:** Usuário autenticado, mas sem permissão para acessar o recurso.
- **404 Not Found:** Recurso ou endpoint solicitado não foi encontrado.
- **500 Internal Server Error:** Falha inesperada ou erro não tratado no servidor.

---

## 📁 Estrutura de Arquivos

```text
├── 17379_7.pdf                   # Guia oficial de estudos e cronograma da UC14 (SENAI)
├── PLANEJAMENTO_SCRUM_EXOAPI.md   # Documento com a metodologia Scrum e divisão das Sprints
├── README.md                      # Apresentação do projeto e guia dos métodos HTTP
├── quadro_trello_exoapi.html      # Interface web interativa do quadro Trello
├── quadro_trello_exoapi.jpg       # Imagem em formato JPEG para submissão
├── quadro_trello_exoapi.png       # Imagem em alta resolução (PNG) para submissão
└── render_board.py                # Script em Python utilizado para renderizar o quadro
```
