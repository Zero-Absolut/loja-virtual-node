import express from "express";
import {
  validaEmailReenvioToken,
  verificaReenvioToken,
  regrasValidaCliente,
  regraCadastrosClientes,
} from "../middlewares/validacaoCadastro.js";
import { cadastraUsuario } from "../controller/cadastro.js";
import {
  ativarConta,
  reenviaTokenAtivacao,
} from "../controller/ativarConta.js";

const route = express.Router();

route.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    sucesso: null,
    mensagem: null,
    erros: {},
    dados: {},
  });
});

route.post(
  "/cadastro",
  regraCadastrosClientes,
  regrasValidaCliente,
  cadastraUsuario,
);

route.get("/index", (req, res) => {
  res.render("index");
});

route.get("/ativar", ativarConta);

//rota de renderização da ativação das contas
route.get("/erro_ativacao", (req, res) => {
  res.render("erro_ativacao");
});

route.get("/conta_ativada", (req, res) => {
  res.render("conta_ativada");
});
//fim da renderização

route.post(
  "/reenviar-ativacao",
  validaEmailReenvioToken,
  verificaReenvioToken,
  reenviaTokenAtivacao,
);
export default route;
