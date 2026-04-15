export function templateAtivacaoConta(codigo) {
  return {
    subject: "🔐 Ative sua conta",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        
        <h2>🔐 Código de ativação</h2>

        <p>Bem-vindo! Para ativar sua conta, utilize o código abaixo:</p>

        <div style="font-size:28px;font-weight:bold;letter-spacing:5px;margin:20px 0;color:#000;">
          ${codigo}
        </div>

        <p>Este código expira em <strong>5 minutos</strong>.</p>

        <p style="margin-top:20px;font-size:12px;color:gray;">
          Se você não solicitou este cadastro, ignore este e-mail.
        </p>

      </div>
    `,
  };
}
