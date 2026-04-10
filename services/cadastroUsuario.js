import Usuarios from "../models/usuarios.js";
import nodemailer from "nodemailer";

export async function criarUsuario(dados) {
  console.log("DADOS RECEBIDOS:", dados);

  try {
    const usuarioExiste = await Usuarios.findOne({
      where: { email: dados.email },
    });

    if (usuarioExiste) {
      return {
        sucesso: false,
        mensagem: "Usuário já cadastrado.",
      };
    }

    const novoUsuario = await Usuarios.create({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      senha: dados.senhaBanco,
      cep: dados.cep,
      logradouro: dados.logradouro,
      numero: dados.numero,
      complemento: dados.complemento || null,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      termos: dados.termos,
      token_ativacao: dados.token,
      status: "inativo",
      token_expira: dados.tokenExpiraEm,
    });

    if (novoUsuario) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Benca" <${process.env.EMAIL_USER}>`,
          to: dados.email,
          subject: "Ative sua conta",
          html: `
            <div style="font-family: Arial; text-align: center;">
              <h2>Bem-vindo à Benca 👋</h2>

              <p>Para ativar sua conta, clique no botão abaixo:</p>

              <a href="http://localhost:3000/ativar?token=${dados.token}"
                 style="
                   display: inline-block;
                   padding: 12px 20px;
                   background-color: black;
                   color: white;
                   text-decoration: none;
                   border-radius: 5px;
                   margin-top: 10px;
                 ">
                 Ativar Conta
              </a>

              <p style="margin-top:20px; font-size:12px; color:gray;">
                Se você não criou essa conta, ignore este email.
              </p>
            </div>
          `,
        });

        console.log("Email enviado");
      } catch (err) {
        console.log("Erro ao enviar email:", err);
      }

      return {
        sucesso: true,
        mensagem: "Usuário cadastrado com sucesso.",
        dados: null,
        erros: null,
      };
    }

    // caso algo dê errado no create
    return {
      sucesso: false,
      mensagem: "Erro ao criar usuário.",
      dados: null,
      erros: null,
    };
  } catch (err) {
    console.log("Erro ao cadastrar novo usuário", err);

    return {
      sucesso: false,
      mensagem: "Erro interno no servidor",
      dados: null,
      erros: null,
    };
  }
}

export async function ativaUsuario(token) {
  try {
    const usuario = await Usuarios.findOne({
      where: { token_ativacao: token },
    });
    const agora = new Date();

    if (!usuario) {
      return {
        sucesso: false,
        mensagem: "Link inválido ou expirado",
      };
    }

    if (usuario.status === "ativo") {
      return {
        sucesso: false,
        mensagem: "Conta já ativada.",
      };
    }

    if (!usuario.token_expira || usuario.token_expira < agora) {
      return {
        sucesso: false,
        mensagem: "Link inválido ou expirado",
      };
    }

    usuario.token_ativacao = null;
    usuario.token_expira = null;
    usuario.status = "ativo";

    await usuario.save();

    return {
      sucesso: true,
      mensagem: "Conta ativada com sucesso.",
    };
  } catch (err) {
    console.error("Erro ao ativar conta.", err);

    return {
      sucesso: false,
      mensagem: "Erro ao ativar conta.",
    };
  }
}
