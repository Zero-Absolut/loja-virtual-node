# 🛒 Ecommerce Fullstack Node

Sistema de e-commerce fullstack desenvolvido com Node.js, focado em boas práticas, organização de código e integração completa entre frontend e backend.

---

## 🚀 Funcionalidades

### 👤 Cadastro de Usuário ✅ (CONCLUÍDO)

* Cadastro de novos usuários
* Validação de dados com middleware
* Verificação de e-mail duplicado
* Criptografia de senha
* Envio de e-mail com Nodemailer
* Retorno padronizado da API
* Exibição de erros no frontend por campo
* Integração completa via Fetch API

---

### 🌐 Integração com API de CEP

* Consulta automática via ViaCEP
* Preenchimento automático de:

  * Logradouro
  * Bairro
  * Cidade
  * Estado
* Melhora na experiência do usuário

---

### 🔐 Autenticação *(em desenvolvimento)*

* Sistema de login
* Sessões
* Planejamento de autenticação em dois fatores (2FA)

---

## 🧠 Tecnologias utilizadas

### 🔙 Backend

* Node.js
* Express
* Sequelize
* MySQL
* Nodemailer

### 🎨 Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* EJS

---

## 📡 Comunicação Front ↔ Back

* Requisições via Fetch API
* Envio de dados em JSON
* Validação centralizada via middleware
* Resposta padrão da API:

```json
{
  "sucesso": false,
  "erros": {
    "email": { "msg": "Formato de e-mail inválido" }

  }
}
```

---

## 📁 Estrutura do Projeto

```bash
📁 BENCA
 ├── 📁 controller
 ├── 📁 database
 ├── 📁 middlewares
 ├── 📁 models
 ├── 📁 node_modules
 ├── 📁 public
 │   ├── 📁 css
 │   ├── 📁 img
 │   └── 📁 js
 ├── 📁 routes
 ├── 📁 services
 ├── 📁 views
 │   ├── 📁 partials
 │   │   └── cadastro.ejs
 │   └── index.ejs
 │
 ├── .env
 ├── dockerfile
 ├── package.json
 ├── package-lock.json
 ├── README.md
 └── server.js
```

---

## ⚙️ Como rodar o projeto

```bash
# Clonar repositório
git clone https://github.com/SEU-USUARIO/ecommerce-fullstack-node.git

# Entrar na pasta
cd ecommerce-fullstack-node

# Instalar dependências
npm install

# Criar arquivo .env
nano .env
```

### 📌 Exemplo de `.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ecommerce

EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
```

```bash
# Rodar o servidor
npm start
```

Acesse:

```
http://localhost:3000
```

---

## 🛠️ Arquitetura

* Arquitetura MVC
* Separação em camadas:

  * Controller
  * Service
  * Model
* Middlewares para validação
* Código modular e escalável
* API desacoplada do frontend

---

## 🚧 Melhorias futuras

* 🔐 Sistema completo de autenticação
* 🛒 Carrinho de compras
* 💳 Integração com pagamento
* 📦 Sistema de pedidos
* 📱 Responsividade completa
* 🌐 Deploy em produção

---

## 💼 Objetivo

Projeto desenvolvido com foco em evolução profissional como desenvolvedor fullstack, aplicando:

* Integração real entre frontend e backend
* Consumo de APIs externas
* Estruturação de aplicações escaláveis
* Boas práticas de desenvolvimento

---

## 👨‍💻 Autor

**Mateus Felipe**

GitHub: https://github.com/Zero-Absolut
LinkedIn: https://www.linkedin.com/in/mateus-fbs

---

## ⭐ Status

🚧 Projeto em desenvolvimento contínuo.

