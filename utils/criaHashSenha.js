import bcrypt from "bcrypt";

export async function criaHashSenha(senha) {
  const saltos = 10;

  const Hash = await bcrypt.hash(senha, saltos);

  return Hash;
}
