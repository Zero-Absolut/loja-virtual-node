import nodemailer from "nodemailer";

export async function enviaEmail(dados) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailEnviado = await transporter.sendMail({
    from: `"Benca" <${process.env.EMAIL_USER}>`,
    to: dados.email,
    subject: "Ative sua conta",
    html: `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    
    <h2>🔐 Código de verificação</h2>

    <p>Recebemos uma tentativa de login na sua conta.</p>

    <p>Use o código abaixo para continuar:</p>

    <div style="font-size:28px;font-weight:bold;letter-spacing:5px;margin:20px 0;color:#000;">
      ${dados.codigo}
    </div>

    <p>Este código expira em <strong>5 minutos</strong>.</p>

    <p style="margin-top:20px;font-size:12px;color:gray;">
      Se você não tentou fazer login, ignore este email.
    </p>

  </div>
`,
  });

  if (!emailEnviado) {
    return {
      sucesso: false,
      mensagem: "Erro ao enviar o e-mail.",
    };
  }
  return {
    sucesso: true,
    mensagem: "E-mail enviado.",
  };
}
