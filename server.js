import express from "express";
import authRoutes from "./routes/routes.js";

import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
//criando uma estancia do express
const app = express();
// Define o motor de templates (template engine) EJS para renderizar views dinâmicas
app.set("view engine", "ejs");

// Permite servir arquivos estáticos da pasta "public" (CSS, JS, imagens)
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

// Faz o Express interpretar requisições com corpo em JSON
app.use(express.json());

// inicio da configuração do middleware global de session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    //  Chave secreta usada para assinar o cookie da sessão (protege contra alteração maliciosa)

    resave: false,
    //  Evita salvar a sessão no servidor a cada requisição se nada mudou (melhora performance)

    saveUninitialized: false,
    //  Não cria sessão vazia automaticamente (só cria quando você realmente usa req.session)

    cookie: {
      secure: false,
      //  Define se o cookie só funciona em HTTPS
      // false = funciona em http (desenvolvimento)
      // true = só funciona em https (produção)

      httpOnly: true,
      //  Impede o JavaScript do navegador de acessar o cookie (proteção contra XSS)

      sameSite: "lax",
      //  Controla quando o cookie é enviado
      // "lax" = envia na maioria dos casos (ideal para apps normais)
      // evita que o navegador bloqueie o cookie em requisições como fetch

      maxAge: 1000 * 60 * 60 * 4,
      // Tempo de vida do cookie (4 horas)
      // depois disso, a sessão expira automaticamente no navegador
    },
  }),
);

//fim

app.use("/", authRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
