export function autenticar(req, res, next) {
  if (!req.session.usuario) {
    res.status(400).json({
      sucesso: false,
      mensagem: "Não autorizado.",
    });
  }

  next();
}
