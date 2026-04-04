import express from "express";
import authRoutes from "./routes/routes.js";

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

app.use("/", authRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
