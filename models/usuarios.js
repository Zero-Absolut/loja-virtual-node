import { DataTypes } from "sequelize";
import conn from "../database/database.js";

// Usuarios e a variavel referente ao model e produtos e o nome da tabela no banco
export const Usuarios = conn.define("usuarios", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  termos: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  token_ativacao: {
    type: DataTypes.STRING,
  },
  data_aceite_termos: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("ativo", "inativo", "bloqueado"),
    defaultValue: "inativo",
  },
  token_expira: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  codigo_2fa: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  codigo_2fa_expira: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  tentativa_login: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

// Sincroniza o model Produtos com o banco de dados
// force: false → não recria a tabela se ela já existir
Usuarios.sync({ force: false })
  .then(() => {
    console.log("Tabela Usuarios criada ou sincronizada com sucesso");
  })
  .catch((err) => {
    console.log("Erro ao criar/sincronizar tabela usuarios", err);
  });

export default Usuarios;
