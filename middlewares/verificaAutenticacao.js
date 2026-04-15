import { body, validationResult } from "express-validator";

export const regrasValidacaoLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Necessário o E-mail.")
    .isEmail()
    .withMessage("Formato de e-mail inválido.")
    .normalizeEmail(),

  body("senha")
    .notEmpty()
    .withMessage("Senha obrigatória.")
    .isLength({ min: 8 })
    .withMessage("A senha deve conter no mínimo 8 caracteres.")
    .matches(/[A-Z]/)
    .withMessage("Deve conter pelo menos 1 letra maiúscula")
    .matches(/[a-z]/)
    .withMessage("Deve conter pelo menos 1 letra minúscula")
    .matches(/[0-9]/)
    .withMessage("Deve conter pelo menos 1 número")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Deve conter pelo menos 1 caractere especial"),
];

export function validaLogin(req, res, next) {
  const erros = validationResult(req);

  if (erros.isEmpty()) {
    return next();
  }

  const errosFormatados = erros.mapped();

  return res.status(401).json({
    sucesso: false,
    mensagem: "E-mail ou senha inválidos",
    erros: errosFormatados,
  });
}

export const regrasRecuperacaoConta = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Necessário o e-mail.")
    .isEmail()
    .withMessage("Necessário um e-mail válido.")
    .normalizeEmail(),
];

export function validarRecuperacaoConta(req, res, next) {
  const erros = validationResult(req);

  const errosTratados = erros.mapped();

  if (!erros.isEmpty) {
    return {
      sucesso: false,
      mensagem: errosTratados,
    };
  }

  return next();
}
