export function templateRecuperacaoSenha(link) {
  return {
    subject: "🔑 Recuperação de senha",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        
        <h2>🔑 Redefinição de senha</h2>

        <p>Recebemos uma solicitação para redefinir sua senha.</p>

        <p>Clique no botão abaixo para criar uma nova senha:</p>

        <div style="margin: 20px 0;">
          <a href="${link}" 
             style="background-color:#000;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
             Redefinir senha
          </a>
        </div>

        <p>Ou copie e cole este link no navegador:</p>

        <p style="font-size:12px;color:gray;word-break:break-all;">
          ${link}
        </p>

        <p>Este link expira em <strong>15 minutos</strong>.</p>

        <p style="margin-top:20px;font-size:12px;color:gray;">
          Se você não solicitou a recuperação, ignore este e-mail.
        </p>

      </div>
    `,
  };
}
