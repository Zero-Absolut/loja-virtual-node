import Usuarios from "../models/usuarios.js";
import bcrypt from "bcrypt";
import { geraCodigo2fs } from "../utils/geraCodigo2fa.js";
import { enviaEmail } from "../utils/envioEmail.js";
import { criaHashSenha } from "../utils/criaHashSenha.js";

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

    const resultado = await enviaEmail({
      email: usuario.email,
      codigo: codigo_2fa,
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
