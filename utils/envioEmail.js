import nodemailer from "nodemailer";

export async function enviaEmail({ email, subject, html }) {
  try {
    // 🛑 validação (ESSENCIAL)
    if (!email || !subject || !html) {
      console.log("Dados inválidos para envio:", { email, subject, html });
      return { sucesso: false, mensagem: "Dados inválidos no envio de email" };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Benca" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("Email enviado:", info.response);

    return { sucesso: true };
  } catch (erro) {
    console.error("Erro ao enviar email:", erro);
    return { sucesso: false, mensagem: "Erro ao enviar email" };
  }
}
