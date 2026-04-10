import Usuarios from "../models/usuarios.js";
import nodemailer from "nodemailer";
import { geraToken } from "../utils/geraToken.js";

export async function reenviaEmailAtivacaoConta(email) {
  try {
    const user = await Usuarios.findOne({ where: { email: email } });

    if (!user) {
      return {
        sucesso: true,
        mensagem: "Se o email estiver cadastrado, você receberá um link",
      };
    }

    if (user.status === "ativo") {
      return {
        sucesso: true,
        mensagem: "Se o email estiver cadastrado, você receberá um link",
      };
    }
    const novoToken = geraToken();
    const uma_hora = 60 * 60 * 1000;
    const expiraEm = new Date(Date.now() + uma_hora);

    user.token_ativacao = novoToken;
    user.token_expira = expiraEm;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Benca" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Ative sua conta",
      html: `
            <div style="font-family: Arial; text-align: center;">
              <h2>Bem-vindo à Benca 👋</h2>

              <p>Para ativar sua conta, clique no botão abaixo:</p>

              <a href="http://localhost:3000/ativar?token=${novoToken}"
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
    console.log("E-mail enviado");

    return {
      sucesso: true,
      mensagem: "Se o email estiver cadastrado, você receberá um link",
    };
  } catch (err) {
    console.error("Erro ao enviar token", err);

    return { sucesso: false, mensagem: "Erro ao reenviar o e-mail." };
  }
}
