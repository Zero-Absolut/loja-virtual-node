import express from "express";
import {
  regrasValidaCliente,
  regraCadastrosClientes,
} from "../middlewares/validacaoCadastro.js";
import { cadastraUsuario } from "../controller/cadastro.js";

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

export default route;
