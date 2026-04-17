import Usuarios from "../models/usuarios.js";
import bcrypt from "bcrypt";
import { geraCodigo2fs } from "../utils/geraCodigo2fa.js";
import { enviaEmail } from "../utils/envioEmail.js";
import { criaHashSenha } from "../utils/criaHashSenha.js";
import { geraToken } from "../utils/geraToken.js";
import { templateRecuperacaoSenha } from "../templates/recuperacaoSenha.js";
import { templateAtivacaoConta } from "../templates/ativacaoConta.js";

export async function autenticarUsuarioService(dados) {
  try {
    const usuario = await Usuarios.findOne({
      where: { email: dados.email },
    });

    if (!usuario) {
      return {
        sucesso: false,
        mensagem: "Usuário ou senha inválidos.",
      };
    }
    if (usuario.status === "inativo") {
      return {
        sucesso: false,
        mensagem: "Sua conta ainda não foi ativada.",
      };
    }

    if (usuario.status === "bloqueado") {
      return {
        sucesso: false,
        mensagem: "Conta bloqueada. Entre em contato com o suporte.",
      };
    }

    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);

    if (!senhaValida) {
      usuario.tentativa_login = usuario.tentativa_login + 1;

      if (usuario.tentativa_login >= 5) {
        usuario.status = "bloqueado";
      }

      await usuario.save();

      if (usuario.status === "bloqueado") {
        return {
          sucesso: false,
          mensagem: "Usuário bloqueado, contate o suporte.",
        };
      }

      return {
        sucesso: false,
        mensagem: "Usuário ou senha inválidos.",
      };
    }

    usuario.tentativa_login = 0;
    await usuario.save();
    //Adicionar condição no front para redirecionar mesmo apos o codigo ter sindo enviaod
    // esta travado sem redirecionamento nesse caso
    if (usuario.codigo_2fa && usuario.codigo_2fa_expira > new Date()) {
      return {
        sucesso: false,
        requer2fa: true,
        mensagem: "Código já enviado. Verifique seu email ou aguarde expirar.",
        id: usuario.id,
      };
    }

    const codigo_2fa = geraCodigo2fs();
    const expira = new Date(Date.now() + 5 * 60 * 1000);
    const codigoHash = await criaHashSenha(String(codigo_2fa));

    usuario.codigo_2fa = codigoHash;
    usuario.codigo_2fa_expira = expira;

    await usuario.save();

    const template = templateAtivacaoConta(codigo_2fa);
    console.log("TEMPLATE:", template);

    const resultado = await enviaEmail({
      email: usuario.email,
      subject: template.subject,
      html: template.html,
    });
    if (!resultado.sucesso) {
      return {
        sucesso: false,
        mensagem: resultado.mensagem,
      };
    }

    return {
      sucesso: true,
      mensagem: "Código enviado por e-mail.",
      requer2fa: true,
      id: usuario.id,
    };
  } catch (err) {
    console.log("Erro ao processar requisição", err);
    return {
      sucesso: false,
      mensagem: "Erro interno no servidor",
    };
  }
}

export async function validaCodigo2fa(dados) {
  const usuario = await Usuarios.findOne({
    where: { id: dados.id },
  });

  if (!usuario) {
    return {
      sucesso: false,
      mensagem: "Usuário não encontrado.",
    };
  }

  if (!usuario.codigo_2fa_expira || usuario.codigo_2fa_expira < new Date()) {
    return {
      sucesso: false,
      mensagem: "Código expirado.",
    };
  }

  const codigoValido = await bcrypt.compare(
    String(dados.codigo),
    usuario.codigo_2fa,
  );

  if (!codigoValido) {
    return {
      sucesso: false,
      mensagem: "Código inválido.",
    };
  }
  usuario.codigo_2fa = null;
  usuario.codigo_2fa_expira = null;

  await usuario.save();

  return {
    sucesso: true,
    mensagem: "Usuário logado com sucesso",
    id: usuario.id,
  };
}

export async function processarRecuperacaoConta(dados) {
  try {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = dados;

    if (!regexEmail.test(email)) {
      return {
        sucesso: false,
        mensagem: "formato de e-mail inválido",
      };
    }
    const usuario = await Usuarios.findOne({
      where: { email: dados },
    });

    if (!usuario) {
      return {
        sucesso: false,
        mensagem:
          "Se o e-mail existir, você receberá as instruções de recuperação.",
      };
    }

    const tokenRecuperacaoConta = geraToken();

    const hashCodigoRecuperaConta = await criaHashSenha(tokenRecuperacaoConta);

    const expira = new Date(Date.now() + 15 * 60 * 1000);

    usuario.token_recuperacao = hashCodigoRecuperaConta;
    usuario.expira_token_recuperacao = expira;
    await usuario.save();

    const link = `http://localhost:3000/resetar-senha?token=${tokenRecuperacaoConta}`;

    const template = templateRecuperacaoSenha(link);

    const respostaEmail = await enviaEmail({
      email: usuario.email,
      subject: template.subject,
      html: template.html,
    });

    if (!respostaEmail.sucesso) {
      return {
        sucesso: false,
        mensagem: "Erro ao enviar o e-mail.",
      };
    }
    return {
      sucesso: true,
      mensagem:
        "Se o e-mail existir, você receberá as instruções de recuperação.",
    };
  } catch (erro) {
    console.error("Erro interno no servidor", erro);

    return {
      sucesso: false,
      mensagem: "Erro ao processar dados.",
    };
  }
}

// função para verificar se o token de setar senha passa

export async function processaVerificacaoTokenResetarSenha(dados) {
  // TODO: implementar validação do token e busca do usuário
  throw new Error("Função ainda não implementada");
}
