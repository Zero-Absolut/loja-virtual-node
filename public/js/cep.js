async function buscaCep(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!resposta.ok) {
      return null;
    }

    const dados = await resposta.json();

    return dados;
  } catch (erro) {
    console.log("Erro ao buscar CEP:", erro);
    return null;
  }
}

document.getElementById("cep").addEventListener("blur", async function () {
  const cep = document.getElementById("cep").value;

  // evita chamar API com lixo
  if (cep.length < 8) return;

  const dados = await buscaCep(cep);

  if (!dados) return;

  document.getElementById("logradouro").value = dados.logradouro || "";
  document.getElementById("bairro").value = dados.bairro || "";
  document.getElementById("cidade").value = dados.localidade || "";
  document.getElementById("estado").value = dados.uf || "";
});
