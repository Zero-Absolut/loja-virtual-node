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

import {
  regrasValidacaoLogin,
  validaLogin,
  regrasRecuperacaoConta,
  validarRecuperacaoConta,
} from "../middlewares/verificaAutenticacao.js";

import {
  login,
  codigo2fa,
  solicitarRecuperacaoConta,
} from "../controller/autenticacaoController.js";

const route = express.Router();

route.get("/cadastro", (req, res) => {
  res.render("cadastro");
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

route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/login", regrasValidacaoLogin, validaLogin, login);

// trobalhar melhor rota logout
route.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ sucesso: true });
  });
});

route.get("/verificar_codigo", (req, res) => {
  res.render("verificar_codigo");
});

route.post("/verificar_codigo", codigo2fa);

route.get("/recuperar-senha", (req, res) => {
  res.render("recuperar-senha");
});

route.post(
  "/recuperar-senha",
  regrasRecuperacaoConta,
  validarRecuperacaoConta,
  solicitarRecuperacaoConta,
);

route.get("/recuperar-senha-enviado", (req, res) => {
  res.render("recuperar-senha-enviado");
});

//route.post("/resetar-senha");
export default route;
