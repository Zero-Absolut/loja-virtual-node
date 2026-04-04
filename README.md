# 🛒 Ecommerce Fullstack Node

Sistema de e-commerce fullstack desenvolvido com Node.js, com foco em boas práticas, validação de dados, integração entre frontend e backend e consumo de APIs externas.

---

## 🚀 Funcionalidades

### 👤 Cadastro de Usuário

* Captura de dados via formulário (EJS + JS)
* Envio utilizando Fetch API
* Validação no backend com middleware
* Exibição de erros por campo no frontend
* Estrutura de resposta padronizada (API)

### 🌐 Integração com API de CEP

* Consulta automática de endereço via API externa (ViaCEP)
* Preenchimento dinâmico dos campos:

  * Logradouro
  * Bairro
  * Cidade
  * Estado
* Redução de erros de digitação
* Melhoria na experiência do usuário

### 🔐 Autenticação *(em desenvolvimento)*

* Sistema de login
* Sessões
* (Planejado) Autenticação em dois fatores (2FA)

---

## 🧠 Tecnologias utilizadas

### Backend

* Node.js
* Express
* JavaScript

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* EJS (renderização de views)

---

## 📡 Comunicação Front ↔ Back

* Requisições via Fetch API
* Envio de dados em JSON
* Validação centralizada via middleware
* Respostas estruturadas:

```json
{
  "sucesso": false,
  "erros": {
    "email": { "msg": "Formato de e-mail inválido" }
  }
}
```

---

## 🧩 Estrutura do Projeto

```bash
📁 projeto
 ├── 📁 controller
 ├── 📁 database
 ├── 📁 middlewares
 │   └── validacaoCadastro.js
 ├── 📁 models
 ├── 📁 public
 │   ├── 📁 css
 │   ├── 📁 img
 │   └── 📁 js
 │       ├── cadastroUsuario.js
 │       └── cep.js
 │
 ├── 📁 routes
 │   ├── routes.js
 │   └── teste.js
 │
 ├── 📁 services
 ├── 📁 views
 │   ├── 📁 partials
 │   │   ├── footer.ejs
 │   │   ├── header.ejs
 │   │   └── cadastro.ejs
 │   └── index.ejs
 │
 ├── dockerfile
 ├── package.json
 ├── package-lock.json
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

# Rodar o servidor
npm start
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🛠️ Arquitetura e boas práticas

* Separação de responsabilidades (MVC)
* Uso de middlewares para validação
* Organização modular (controllers, services, routes)
* Comunicação desacoplada via API
* Frontend consumindo backend via fetch

---

## 🚧 Melhorias futuras

* 🔐 Sistema completo de autenticação
* 🔐 Autenticação em dois fatores (2FA)
* 🛒 Carrinho de compras
* 💳 Integração com pagamento
* 📦 Sistema de pedidos
* 📱 Responsividade completa
* 🌐 Deploy em produção

---

## 💼 Objetivo do Projeto

Projeto desenvolvido com foco na transição para desenvolvimento fullstack, aplicando:

* Integração entre frontend e backend
* Consumo de APIs externas
* Estruturação de aplicações reais
* Boas práticas de organização de código

---

## 👨‍💻 Autor

**Mateus**

🔗 GitHub: https://github.com/Zero-Absolut
🔗 LinkedIn: https://www.linkedin.com/in/mateus-fbs

---

## ⭐ Observação

Este projeto está em constante evolução conforme avanço nos estudos e implementação de novas funcionalidades.
