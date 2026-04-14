import {
  autenticarUsuarioService,
  validaCodigo2fa,
} from "../services/autenticacaoService.js";

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
  const usuario2fa = req.session.usuario2fa;

  if (!usuario2fa || !usuario2fa.id) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Sessão inválida",
    });
  }

  const id = usuario2fa.id;

  const resultado = await validaCodigo2fa({ codigo, id });

  if (!resultado.sucesso) {
    return res.status(401).json({
      sucesso: false,
      mensagem: resultado.mensagem,
    });
  }

  req.session.usuario = {
    id: resultado.id,
  };

  if (req.session.usuario) {
    delete req.session.usuario2fa;
  }
  return res.status(200).json({
    sucesso: true,
    mensagem: resultado.mensagem,
  });
}
