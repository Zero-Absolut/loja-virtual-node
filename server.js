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
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true só em HTTPS
      maxAge: 1000 * 60 * 60 * 4,
    },
  }),
);
//fim

app.use("/", authRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
