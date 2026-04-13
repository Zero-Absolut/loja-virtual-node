import { autenticarUsuarioService } from "../services/autenticacaoService.js";

export async function login(req, res) {
  const { email, senha } = req.body;

  const resultado = await autenticarUsuarioService({ email, senha });

  if (!resultado.sucesso) {
    return res.status(401).json({
      sucesso: false,
      mensagem: resultado.mensagem,
      requer2fa: resultado.requer2fa,
    });
  }
  req.session.usuario2fa = {
    id: resultado.id,
  };
  return res.status(200).json({
    sucesso: true,
    requer2fa: resultado.requer2fa,
    mensagem: resultado.mensagem,
  });
}

export async function codigo2fa(req, res) {
  const codigo = req.body.codigo;
  const id = req.session.usuario2fa?.id;

  if (!id) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Sessão inválida",
    });
  }

  const resultado = await validaCodigo2fa({ codigo, id });

  if (!resultado.sucesso) {
    return res.status(401).json({
      sucesso: false,
      mensagem: resultado.mensagem,
    });
  }
  delete req.session.usuario2fa;
  req.session.usuario = {
    id: resultado.id,
  };
  return res.status(200).json({
    sucesso: true,
    mensagem: resultado.mensagem,
  });
}
