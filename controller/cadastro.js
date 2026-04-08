import bcrypt from "bcrypt";
import { criarUsuario } from "../services/cadastroUsuario.js";
import crypto from "crypto";
//function para gerar token aleatorio

function geraToken() {
  return crypto.randomBytes(32).toString("hex");
}

//function para criar hash de senha
async function criaHashSenha(senha) {
  const saltos = 10;

  const Hash = await bcrypt.hash(senha, saltos);

  return Hash;
}

export async function cadastraUsuario(req, res) {
  try {
    const dadosClienteCadastro = req.body;

    const senhaHash = await criaHashSenha(dadosClienteCadastro.senha);
    const token = geraToken();

    delete dadosClienteCadastro.senha;
    delete dadosClienteCadastro.confirmar_senha;

    dadosClienteCadastro.senhaBanco = senhaHash;
    dadosClienteCadastro.token = token;

    const resultado = await criarUsuario(dadosClienteCadastro);

    if (!resultado.sucesso) {
      return res.status(400).json({
        sucesso: false,
        mensagem: resultado.mensagem,
        dados: null,
        erros: null,
      });
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: resultado.mensagem,
      dados: null,
      erros: null,
    });
  } catch (err) {
    console.log("Erro no controller:", err);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno no servidor",
      dados: null,
      erros: null,
    });
  }
}
