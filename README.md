
# Backend MVC com TypeScript

Este projeto é um backend desenvolvido com Node.js, TypeScript, Express e TypeORM, seguindo a arquitetura MVC (Model-View-Controller). Ele oferece suporte a autenticação via JWT e operações CRUD para gerenciar usuários, listas de compras e itens.

---

## Funcionalidades

- **Autenticação**:
  - Login com geração de tokens JWT para proteger rotas.
  - Validação de usuários autenticados.

- **CRUD Completo**:
  - **Usuários**: Criação, leitura, atualização e exclusão.
  - **Listas de Compras**: Adicionar, listar, editar e excluir listas.
  - **Itens**: Adicionar itens a listas, editar e remover.

- **Estrutura Modular**:
  - Divisão clara entre controllers, services e repositories.

- **Middleware de Autenticação**:
  - Controle de acesso em rotas protegidas.

- **Configuração de Banco de Dados**:
  - Mapeamento de entidades com TypeORM.
  - Relacionamentos entre tabelas (ex.: usuários e listas de compras).

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web minimalista.
- **TypeORM**: ORM para abstração do banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Supabase**: Interface usada para manipulação do banco de dados.

---

## Estrutura do Projeto

```plaintext
src/
├── controllers/         # Lida com as requisições HTTP
├── database/            # Configuração do banco de dados
├── middleware/          # Middleware de autenticação e validação
├── models/              # Definições das entidades do banco de dados
├── repositories/        # Interação direta com o banco de dados
├── routes/              # Definição das rotas da aplicação
├── services/            # Lógica de negócios
└── app.ts               # Arquivo principal do servidor
```

---

## Pré-requisitos

- **Node.js**: Versão 16 ou superior.
- **PostgreSQL**: Banco de dados relacional.
- **Yarn ou npm**: Gerenciador de pacotes.
- **Supabase** (opcional): Para manipulação gráfica do banco de dados.

---

## Instalação e Configuração

### 1. Clone o repositório:
```bash
git clone https://github.com/alleffe/semestral-backend/
cd backend-mvc
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### 4. Configure o banco de dados:
- Configure o banco de dados PostgreSQL.
- Execute as migrations:
```bash
npm run typeorm migration:run
```

### 5. Inicie o servidor:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Rotas da API

### **Autenticação**
- **POST /api/auth/login**: Login e geração de token JWT.

### **Usuários**
- **POST /api/users**: Criação de usuários.
- **GET /api/users**: Listagem de usuários.
- **GET /api/users/:id**: Detalhes de um usuário.
- **PUT /api/users/:id**: Atualização de usuário.
- **DELETE /api/users/:id**: Exclusão de usuário.

### **Listas de Compras**
- **POST /api/shopping-lists**: Criação de uma lista de compras.
- **GET /api/shopping-lists**: Listagem de listas de compras.
- **GET /api/shopping-lists/:id**: Detalhes de uma lista.
- **PUT /api/shopping-lists/:id**: Atualização de uma lista.
- **DELETE /api/shopping-lists/:id**: Exclusão de uma lista.

### **Itens**
- **POST /api/items**: Adicionar item a uma lista.
- **GET /api/items**: Listar itens.
- **PUT /api/items/:id**: Atualizar item.
- **DELETE /api/items/:id**: Excluir item.

---

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento.
- **`npm run build`**: Compila o projeto para produção.
- **`npm run start`**: Inicia o servidor em modo de produção.
- **`npm run lint`**: Executa o linter para identificar problemas de código.

---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/minha-feature`).
3. Commit suas alterações (`git commit -m 'Adicionar minha funcionalidade'`).
4. Faça um push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.

---

