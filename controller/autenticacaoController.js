import {
  autenticarUsuarioService,
  validaCodigo2fa,
} from "../services/autenticacaoService.js";
import { processarRecuperacaoConta } from "../services/autenticacaoService.js";
export async function login(req, res) {
  try {
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
  } catch (erro) {
    console.error("Erro no login:", erro);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno no servidor",
    });
  }
}

export async function codigo2fa(req, res) {
  try {
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

    delete req.session.usuario2fa;

    return res.status(200).json({
      sucesso: true,
      mensagem: resultado.mensagem,
    });
  } catch (erro) {
    console.error("Erro no 2FA:", erro);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno no servidor",
    });
  }
}

export async function solicitarRecuperacaoConta(req, res) {
  try {
    const email = req.body.email;

    const resposta = await processarRecuperacaoConta(email);

    if (!resposta.sucesso) {
      return res.status(400).json({
        sucesso: false,
        mensagem: resposta.mensagem,
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: resposta.mensagem,
    });
  } catch (err) {
    console.error("Erro no recuperação de conta", err);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno no servidor",
    });
  }
}
