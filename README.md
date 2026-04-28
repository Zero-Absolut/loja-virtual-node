🛒 Ecommerce Fullstack Node

Sistema de e-commerce fullstack desenvolvido com Node.js, com foco em arquitetura escalável, segurança e boas práticas de desenvolvimento.

🚀 Principais funcionalidades
👤 Cadastro de Usuário ✅
Validação de dados via middleware
Verificação de e-mail duplicado
Criptografia de senha com hash seguro
Envio de e-mail com Nodemailer
Retorno padronizado da API
Exibição de erros por campo no frontend
Integração completa via Fetch API
🌐 Integração com CEP
Consumo da API ViaCEP
Preenchimento automático de endereço
Melhoria da experiência do usuário
🔐 Autenticação (em evolução)
Sistema de login
Sessões
Planejamento de 2FA
Planejamento de login social
🧠 Stack utilizada
🔙 Backend
Node.js
Express
Sequelize
MySQL
Nodemailer
🎨 Frontend
HTML5
CSS3
JavaScript (Vanilla)
EJS
📡 Comunicação Front ↔ Back
Requisições via Fetch API
Envio de dados em JSON
Validação centralizada via middleware
Padrão de resposta:
{
  "sucesso": false,
  "erros": {
    "email": { "msg": "Formato de e-mail inválido" }
  }
}
🏗️ Arquitetura e decisões técnicas
Arquitetura baseada em MVC + camada de serviços
Separação de responsabilidades (Controller / Service / Model)
Uso de middlewares para validação e segurança
Código modular visando escalabilidade
⚠️ Evolução arquitetural

Durante o desenvolvimento, parte da aplicação foi implementada com renderização no backend (EJS), o que aproximou o projeto de um modelo monolítico.

Atualmente, o projeto está em processo de evolução para uma abordagem mais desacoplada:

Backend focado em API REST
Frontend consumindo dados via Fetch
Padronização de respostas para escalabilidade
🔐 Segurança
Senhas armazenadas com hash seguro
Tokens de ativação criptografados
Estrutura preparada para 2FA
Boas práticas de validação e sanitização de dados
🚧 Roadmap (evolução planejada)
🔐 Autenticação completa (login + 2FA)
🌐 Login social (OAuth)
🛒 Carrinho de compras
💳 Integração com pagamentos
📦 Sistema de pedidos
📡 API totalmente desacoplada
📱 Responsividade completa
☁️ Deploy em produção
💡 Projeto relacionado (nova versão da API)

Atualmente estou desenvolvendo uma nova API de autenticação com foco em:

Arquitetura escalável
Padronização de respostas
Segurança avançada
Suporte a login social
💼 Objetivo

Projeto desenvolvido com foco em evolução como desenvolvedor fullstack, aplicando:

Integração real entre frontend e backend
Consumo de APIs externas
Estruturação de aplicações escaláveis
Boas práticas de segurança
👨‍💻 Autor

Mateus Felipe
GitHub: https://github.com/Zero-Absolut

LinkedIn: https://www.linkedin.com/in/mateus-fbs

⭐ Status

🚧 Projeto em evolução contínua
