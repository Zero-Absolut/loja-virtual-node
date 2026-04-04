import express from "express";
import {
  regrasValidaCliente,
  regraCadastrosClientes,
} from "../middlewares/validacaoCadastro.js";

const route = express.Router();

route.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    sucesso: null,
    mensagem: null,
    erros: {},
    dados: {},
  });
});

route.post("/cadastro", regraCadastrosClientes, regrasValidaCliente);

route.get("/index", (req, res) => {
  res.render("index");
});

export default route;
