import { criarUsuario } from "../services/cadastroUsuario.js";
import { criaHashSenha } from "../utils/criaHashSenha.js";
import { geraToken } from "../utils/geraToken.js";

export async function cadastraUsuario(req, res) {
  try {
    const dadosClienteCadastro = req.body;

    const senhaHash = await criaHashSenha(dadosClienteCadastro.senha);
    const token = geraToken();

    const expiraEm = new Date(Date.now() + 60 * 60 * 1000); // 1h

    delete dadosClienteCadastro.senha;
    delete dadosClienteCadastro.confirmar_senha;

    dadosClienteCadastro.tokenExpiraEm = expiraEm;
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
