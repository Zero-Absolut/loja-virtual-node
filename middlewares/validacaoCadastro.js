import { body, validationResult } from "express-validator";

// regras de validação dos dados do usuário
export const regraCadastrosClientes = [
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("O nome não pode ser vazio")
    .escape()
    .isLength({ min: 3 })
    .withMessage("Nome muito curto.")
    .isLength({ max: 100 })
    .withMessage("Nome muito longo"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail obrigatório.")
    .isEmail()
    .withMessage("Formato de e-mail inválido.")
    .normalizeEmail(),

  body("telefone")
    .notEmpty()
    .withMessage("Telefone obrigatório.")
    .customSanitizer((valor) => {
      if (!valor) return "";
      return String(valor).replace(/\D/g, "");
    })
    .isLength({ min: 10, max: 11 })
    .withMessage("Telefone deve ter 10 ou 11 dígitos.")
    .isNumeric()
    .withMessage("Telefone inválido"),

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

  body("confirmar_senha")
    .notEmpty()
    .withMessage("Confirmação de senha obrigatória.")
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error("As senhas não conferem");
      }
      return true;
    }),

  body("cep")
    .notEmpty()
    .withMessage("CEP obrigatório.")
    .customSanitizer((valor) => {
      if (!valor) return "";
      return String(valor).replace(/\D/g, "");
    })
    .isLength({ min: 8, max: 8 })
    .withMessage("CEP inválido"),

  body("logradouro")
    .notEmpty()
    .withMessage("Endereço obrigatório.")
    .trim()
    .escape(),

  body("numero").notEmpty().withMessage("Número obrigatório").trim().escape(),

  body("complemento").optional().trim().escape(),

  body("bairro")
    .notEmpty()
    .withMessage("Bairro obrigatório")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Nome do bairro muito curto.")
    .isLength({ max: 100 })
    .withMessage("Nome do bairro muito longo"),

  body("cidade")
    .notEmpty()
    .withMessage("Cidade obrigatória.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Nome da cidade muito curto.")
    .isLength({ max: 100 })
    .withMessage("Nome da cidade muito longo.")
    .escape(),

  body("estado")
    .trim()
    .notEmpty()
    .withMessage("O estado é obrigatório.")
    .isIn([
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ])
    .withMessage("Estado inválido."),

  body("termos")
    .exists()
    .withMessage("Necessário aceitar os termos")
    .bail()
    .toBoolean()
    .custom((value) => {
      if (value !== true) {
        throw new Error("Necessário aceitar os termos");
      }
      return true;
    }),
];

// middleware de validação
export function regrasValidaCliente(req, res, next) {
  const erros = validationResult(req);

  if (erros.isEmpty()) {
    return next();
  }

  console.log("Chegou");

  return res.status(400).json({
    sucesso: false,
    mensagem: "Erro de validação",
    erros: erros.mapped(),
    dados: req.body,
  });
}
