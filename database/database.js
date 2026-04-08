import { Sequelize } from "sequelize";

const conn = new Sequelize("benca", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

async function conectaDB() {
  try {
    conn.authenticate();
    console.log("conectado ao banco de dados");
  } catch (err) {
    console.log("erro ao conectar a base de dados", err);
  }
}

conectaDB();

export default conn;
