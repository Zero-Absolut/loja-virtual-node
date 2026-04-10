import { reenviaEmailAtivacaoConta } from "../services/recuperaConta.js";
import { ativaUsuario } from "../services/cadastroUsuario.js";

export async function ativarConta(req, res) {
  const { token } = req.query;

  const resultado = await ativaUsuario(token);

  if (!resultado.sucesso) {
    return res.redirect("/erro_ativacao");
  }

  return res.redirect("/conta_ativada");
}

// function de reenvio de token
export async function reenviaTokenAtivacao(req, res) {
  const resultado = await reenviaEmailAtivacaoConta(req.body.email);

  if (!resultado.sucesso) {
    return res.status(201).json({
      sucesso: false,
      mensagem: resultado.mensagem,
    });
  }

  return res.status(400).json({
    sucesso: true,
    meensage: resultado.mensagem,
  });
}
